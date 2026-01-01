import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { SignUp } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
`

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Form = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
`

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`

const CheckboxGroup = styled.div`
  margin-bottom: 1.5rem;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`

const Button = styled.button`
  width: 100%;
  background: #6366f1;
  color: white;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #5b5bd6;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;

  a {
    color: #6366f1;
    font-weight: 600;
  }
`

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`

export default function Signup() {
  const router = useRouter()
  const { isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  return (
    <Container>
      <Navbar />
      <FormContainer>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg"
            }
          }}
          routing="hash"
          signInUrl="/login"
          afterSignUpUrl="/dashboard"
        />
      </FormContainer>
    </Container>
  )
}
