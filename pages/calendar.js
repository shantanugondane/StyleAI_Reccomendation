import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const MonthYear = styled.h2`
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
`

const NavButton = styled.button`
  background: #f3f4f6;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #6366f1;
  transition: background 0.2s;

  &:hover {
    background: #e5e7eb;
  }
`

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const WeekDay = styled.div`
  text-align: center;
  font-weight: 600;
  color: #666;
  padding: 0.5rem;
  font-size: 0.9rem;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`

const DayCell = styled.div`
  aspect-ratio: 1;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.2s;
  background: ${props => props.$isToday ? '#6366f1' : props.$isSelected ? '#e0e7ff' : 'transparent'};
  color: ${props => props.$isToday ? 'white' : props.$isOtherMonth ? '#d1d5db' : '#333'};
  font-weight: ${props => props.$isToday ? '600' : 'normal'};

  &:hover {
    background: ${props => props.$isToday ? '#5b5bd6' : '#f3f4f6'};
  }
`

const DayNumber = styled.div`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`

const DayEvent = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$color || '#6366f1'};
  margin-top: 0.25rem;
`

const SelectedDateInfo = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 4px solid #6366f1;
`

const SelectedDateTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`

const SelectedDateText = styled.p`
  color: #666;
  font-size: 0.95rem;
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
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login')
    }
  }, [isSignedIn, isLoaded, router])

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date) => {
    if (!date) return false
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  const isOtherMonth = (date) => {
    if (!date) return true
    return date.getMonth() !== currentDate.getMonth()
  }

  const formatSelectedDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`

  return (
    <Container>
      <Navbar />
      <Header>
        <Title>Calendar</Title>
        <Subtitle>Plan your weekly outfits</Subtitle>
      </Header>
      <MainContent>
        <CalendarCard>
          <CalendarHeader>
            <NavButton onClick={goToPreviousMonth}>‹</NavButton>
            <MonthYear>{monthYear}</MonthYear>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <NavButton onClick={goToToday}>Today</NavButton>
              <NavButton onClick={goToNextMonth}>›</NavButton>
            </div>
          </CalendarHeader>

          <WeekDays>
            {weekDays.map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>

          <CalendarGrid>
            {days.map((date, index) => (
              <DayCell
                key={index}
                $isToday={isToday(date)}
                $isSelected={isSelected(date)}
                $isOtherMonth={isOtherMonth(date)}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <DayNumber>{date.getDate()}</DayNumber>
                    {/* Placeholder for future outfit events */}
                    {Math.random() > 0.85 && (
                      <DayEvent $color="#6366f1" />
                    )}
                  </>
                )}
              </DayCell>
            ))}
          </CalendarGrid>

          <SelectedDateInfo>
            <SelectedDateTitle>Selected Date</SelectedDateTitle>
            <SelectedDateText>{formatSelectedDate(selectedDate)}</SelectedDateText>
            <SelectedDateText style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
              Outfit planning feature coming soon...
            </SelectedDateText>
          </SelectedDateInfo>
        </CalendarCard>
      </MainContent>
    </Container>
  )
}

