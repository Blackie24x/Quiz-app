import React, { useContext } from "react";
import ReactSlider from "react-slider";
import { Store } from "../Context";

const QuizSetup: React.FC = () => {
  const {
    amount,
    setAmount,
    difficulty,
    setDifficulty,
    setCreatingMode,
    setQuestions,
  } = useContext(Store);

  const createQuiz = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    setQuestions(data.results);
    setCreatingMode(false);
  };

  return (
    <section className="quiz-setup">
      <h2 className="heading">Create quiz</h2>
      <div className="content-side">
        {" "}
        <div className="amount-wrap">
          <p className="amount">Amount of questions: {amount}</p>

          <ReactSlider
            className="slider"
            thumbClassName="thumb"
            onChange={(newValue) => {
              setAmount(newValue);
            }}
            value={amount}
            min={5}
            max={20}
          />
        </div>
        <div className="lvls-wrap">
          <p className="lvl-heading">Select a difficulty</p>
          <div className="lvls">
            {" "}
            <div
              className={`lvl ${difficulty === "easy" ? "picked" : ""}`}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </div>
            <div
              className={`lvl ${difficulty === "medium" ? "picked" : ""}`}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </div>
            <div
              className={`lvl ${difficulty === "hard" ? "picked" : ""}`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </div>
          </div>
        </div>
        <button className="creating-btn" onClick={createQuiz}>
          Create Quiz
        </button>
      </div>
    </section>
  );
};

export default QuizSetup;
