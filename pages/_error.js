import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`

const ErrorBox = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;

  h1 {
    font-size: 4rem;
    color: #6366f1;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

  a {
    display: inline-block;
    background: #6366f1;
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;

    &:hover {
      background: #5b5bd6;
    }
  }
`

function Error({ statusCode }) {
  return (
    <Container>
      <ErrorBox>
        <h1>{statusCode || 'Error'}</h1>
        <p>
          {statusCode === 404
            ? 'This page could not be found.'
            : 'An error occurred on the server.'}
        </p>
        <Link href="/">Go back home</Link>
      </ErrorBox>
    </Container>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

