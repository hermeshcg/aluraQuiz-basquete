/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';

function Loading() {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando ...</h1>
      </Widget.Header>
      <img
        src="https://media.giphy.com/media/1jYEnUrwpOvafvkovA/giphy.gif"
        alt="Loading"
        style={{ width: '100%', height: '350px', objectFit: 'cover' }}
      />
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  handleSubmit,
  setSelectedAlternative,
  hasQuestionBeenSelected,
  setHasQuestionBeenSelected,
}) {
  const questionID = `question_${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        src={question.image}
        alt="Descricao"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <form onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeID = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeID}
                key={alternativeID}
              >
                <input
                  id={alternativeID}
                  name={questionID}
                  type="radio"
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex + 1);
                    setHasQuestionBeenSelected(true);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasQuestionBeenSelected}>
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

function QuizResult({ points, results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Parabéns, você concluiu o quiz sobre basquete :D</h1>
      </Widget.Header>
      <img
        src="https://media.giphy.com/media/xT9DPDoWMicL4nU3NC/giphy.gif"
        alt="Vitória"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <Widget.Content>
        <h3>Você fez {points} pontos :D</h3>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {index + 1}: {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[currentQuestion];
  const [selectedAlternative, setSelectedAlternative] = useState();
  const isCorrect = selectedAlternative === question.answer;
  const [hasQuestionBeenSelected, setHasQuestionBeenSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3000);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const nextQuestion = questionIndex + 1;
    if (isCorrect) {
      toast.success('Você acertou :)');
      setPoints(points + 10);
      setResults([...results, true]);
    } else {
      setResults([...results, false]);
      toast.error('Você errou :(  ');
    }
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
      setHasQuestionBeenSelected(false);
      setSelectedAlternative(undefined);
    } else {
      setScreenState(screenStates.RESULT);
      setHasQuestionBeenSelected(false);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg2}>
      <QuizContainer>
        <QuizLogo />

        {screenState === 'QUIZ' && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            handleSubmit={handleSubmit}
            setSelectedAlternative={setSelectedAlternative}
            hasQuestionBeenSelected={hasQuestionBeenSelected}
            setHasQuestionBeenSelected={setHasQuestionBeenSelected}
          />
        )}

        {screenState === 'LOADING' && <Loading />}

        {screenState === 'RESULT' && (
          <QuizResult points={points} results={results} />
        )}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/hermeshcg" />
    </QuizBackground>
  );
}
