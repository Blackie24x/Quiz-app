import React, { createContext, useContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

interface Values {
  amount: any;
  setAmount: any;
  difficulty: string;
  setDifficulty: any;
  creatingMode: boolean;
  // setCreatingMode: (value: boolean) => void;
  setCreatingMode: any;
  questions: any;
  setQuestions: any;
}

export const Store = createContext<Partial<Values>>({});

const Context: React.FC<Props> = ({ children }) => {
  const [amount, setAmount] = useState(10);
  const [creatingMode, setCreatingMode] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const appContext: Values = {
    amount,
    setAmount,
    creatingMode,
    setCreatingMode,
    difficulty,
    setDifficulty,
    questions,
    setQuestions,
  };

  return <Store.Provider value={appContext}>{children}</Store.Provider>;
};
export default Context;
