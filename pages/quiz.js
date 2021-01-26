/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function pages() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <Container>
      <h1>Seja bem vindx, {name}</h1>
    </Container>
  );
}

export default pages;
