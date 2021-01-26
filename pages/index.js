import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Bota teu nome ai e bora jogar"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={name === ''}
                style={{
                  marginTop: '16px',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  width: '100%',
                  background: '#121212',
                  color: '#fff',
                }}
              >
                Jogar
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/hermeshcg" />
    </QuizBackground>
  );
}

export default Home;
