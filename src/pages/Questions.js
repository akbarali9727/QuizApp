import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleScoreChange } from "../redux/actions";
import {decode} from "html-entities";
import {useNavigate} from "react-router-dom";



const getRandomInt = (max) => {
  max++;
  return Math.floor(Math.random() * max);
}

const Questions = () => {

  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  let apiUrl = "/api.php?amount=" + amount_of_question;
  if (question_category) {
    apiUrl = apiUrl.concat("&category=" + question_category);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat("&difficulty=" + question_difficulty);
  }
  if (question_type) {
    apiUrl = apiUrl.concat("&type=" + question_type);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [showFinalResults, setFinalResults] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers)
    }
  }, [response, questionIndex]);

  if (loading) {
    return <div className="spinner-border text-primary my-spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  }


  const optionClicked = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }


    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setFinalResults(true);
    }
  }

  function restartGame(){
    dispatch(handleScoreChange(0));
    setQuestionIndex(0);
    setFinalResults(false);
  }
  function goToSettings(){
    restartGame();
    navigate("/");
  }

  return <div>
    <h2>Currens Score: {score}</h2>
    {showFinalResults ?
      (<div className="final-results">
        <h1>Final Results</h1>
        <h2>
          {score} out of {response.results.length} correct = ({score / response.results.length * 100}%)
        </h2>
        <button onClick={restartGame}>Restart game</button>
        <button onClick={goToSettings}>Go to Settings</button>
      </div>)
      :
      (<div className="question-card">
        <h2>Question {questionIndex+1} out of {amount_of_question}</h2>
        <h3 className="question-text">{decode(response.results[questionIndex].question)}</h3>
        <ul>
          {options.map((data, id) => {
            return (
              <li key={id} onClick={optionClicked} >{decode(data)}</li>
            )
          })}
        </ul>
      </div>)

    }






  </div>
}

export default Questions;