import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
  max-width: 400px;
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

const SignupLink = styled.p`
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

const DemoButton = styled.button`
  width: 100%;
  background: transparent;
  color: #6366f1;
  border: 2px solid #6366f1;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    background: #6366f1;
    color: white;
  }
`

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any email/password
      const userData = {
        id: Date.now().toString(),
        name: 'Demo User',
        email: formData.email,
        gender: 'female',
        stylePreferences: ['casual', 'formal'],
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      setLoading(false)
      router.push('/dashboard')
    }, 1000)
  }

  const handleDemoLogin = () => {
    const userData = {
      id: Date.now().toString(),
      name: 'Demo User',
      email: 'demo@styleai.com',
      gender: 'female',
      stylePreferences: ['casual', 'formal', 'bohemian'],
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    router.push('/dashboard')
  }

  return (
    <Container>
      <Navbar />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your StyleAI account</Subtitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <DemoButton onClick={handleDemoLogin}>
            Try Demo Account
          </DemoButton>

          <SignupLink>
            Don't have an account? <a href="/signup">Sign up</a>
          </SignupLink>
        </Form>
      </FormContainer>
    </Container>
  )
}
