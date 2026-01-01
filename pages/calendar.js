import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`

const Header = styled.div`
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
`

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`

const MainContent = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`

const CalendarCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const ComingSoon = styled.div`
  font-size: 1.5rem;
  color: #6366f1;
  margin-bottom: 1rem;
`

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
`

// Force dynamic rendering - this page uses Clerk which requires server-side rendering
export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default function Calendar() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login')
    }
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Navbar />
      <Header>
        <Title>Calendar</Title>
        <Subtitle>Plan your weekly outfits</Subtitle>
      </Header>
      <MainContent>
        <CalendarCard>
          <ComingSoon>📅 Coming Soon</ComingSoon>
          <Description>
            The calendar feature will allow you to plan your outfits for the week ahead.
            You'll be able to schedule outfits for specific days and sync with your calendar.
          </Description>
        </CalendarCard>
      </MainContent>
    </Container>
  )
}

