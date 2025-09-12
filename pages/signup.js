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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    stylePreferences: []
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        stylePreferences: checked 
          ? [...prev.stylePreferences, value]
          : prev.stylePreferences.filter(pref => pref !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple validation
    if (!formData.name || !formData.email || !formData.password || !formData.gender) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      setLoading(false)
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <Container>
      <Navbar />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Create Your Account</Title>
          <Subtitle>Join StyleAI and start your fashion journey</Subtitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email Address *</Label>
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
            <Label htmlFor="password">Password *</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="gender">Gender *</Label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </Select>
          </InputGroup>

          <CheckboxGroup>
            <Label>Style Preferences (Select all that apply)</Label>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                value="formal"
                checked={formData.stylePreferences.includes('formal')}
                onChange={handleInputChange}
              />
              Formal
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                value="casual"
                checked={formData.stylePreferences.includes('casual')}
                onChange={handleInputChange}
              />
              Casual
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                value="sporty"
                checked={formData.stylePreferences.includes('sporty')}
                onChange={handleInputChange}
              />
              Sporty
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                value="bohemian"
                checked={formData.stylePreferences.includes('bohemian')}
                onChange={handleInputChange}
              />
              Bohemian
            </CheckboxLabel>
          </CheckboxGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <LoginLink>
            Already have an account? <a href="/login">Sign in</a>
          </LoginLink>
        </Form>
      </FormContainer>
    </Container>
  )
}
