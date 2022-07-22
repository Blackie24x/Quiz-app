import React, { useState, useContext } from "react";
import QuizSetup from "./components/QuizSetup";
import Quiz from "./components/Quiz";
import { Store } from "./Context";

function App() {
  const { creatingMode } = useContext(Store);
  return <div className="app">{creatingMode ? <QuizSetup /> : <Quiz />}</div>;
}

export default App;
