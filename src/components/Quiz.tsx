import React, { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../Context";

// type Props = {
//   amount: number;
//   difficulty: string;
// };

const Quiz: React.FC = () => {
  const { amount, questions, setCreatingMode } = useContext(Store);
  const [number, setNumber] = useState(1);
  const [pickedAnswer, setPickedAnswer] = useState("");
  const [sortedAnswers, setSortedAnswers]: any = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const correctAnswers = useRef(0);
  const showQuestion = () => {
    let question = questions[number - 1].question;
    question = question.replaceAll("&#039;", "'");
    question = question.replaceAll("&quot;", "'");
    return question;
  };
  useEffect(() => {
    if (isCorrect) correctAnswers.current++;
  }, [isCorrect]);
  useEffect(() => {
    const incorrectAnswers = questions[number - 1].incorrect_answers;
    const correct_answer = questions[number - 1].correct_answer;
    setSortedAnswers(
      [...incorrectAnswers, correct_answer].sort(() => Math.random() - 0.5)
    );
  }, [number]);
  const showAnswers = () => {
    const correct_answer = questions[number - 1].correct_answer;

    const answers = [...sortedAnswers];

    const stylesOnCheckAnswer = (answer: string) => {
      if (pickedAnswer === correct_answer && pickedAnswer === answer) {
        if (!isCorrect) setIsCorrect(true);
        return "correct";
      } else if (pickedAnswer !== correct_answer && pickedAnswer === answer)
        return "incorrect";
      else if (
        pickedAnswer.length &&
        pickedAnswer !== correct_answer &&
        answer === correct_answer
      )
        return "correct";
    };
    return answers.map((answer) => (
      <div className="answer-wrap">
        <button
          className={`check ${
            pickedAnswer.length && stylesOnCheckAnswer(answer)
          }`}
          onClick={() => {
            if (!pickedAnswer.length) setPickedAnswer(answer);
          }}
        ></button>
        <p className="answer">{answer}</p>
      </div>
    ));
  };
  const nextQuestion = () => {
    if (pickedAnswer.length) {
      setPickedAnswer("");
      setIsCorrect(false);
      if (number < amount) setNumber((prev) => prev + 1);
      else setQuizFinished(true);
    }
  };
  return (
    <div className="quiz">
      <h2 className="heading">Quiz</h2>
      {quizFinished ? (
        <div className="score-side">
          <p className="percent-score">
            {Math.round((correctAnswers.current / amount) * 100)}%
          </p>
          <p className="percent-label">Correct Answers</p>
          <p className="score-desc">
            You answered correctly on
            <span className="correct">{correctAnswers.current}</span> out of{" "}
            <span className="total">{amount}</span> questions
          </p>
          <button
            className="new-quiz"
            onClick={() => {
              setNumber(1);
              setCreatingMode(true);
              correctAnswers.current = 0;
            }}
          >
            New Quiz
          </button>
        </div>
      ) : (
        <div className="content-side">
          <p className="question-number">
            {number} / {amount}
          </p>
          <p className="question">{showQuestion()}</p>
          <div className="answers-wrap">{showAnswers()}</div>
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
