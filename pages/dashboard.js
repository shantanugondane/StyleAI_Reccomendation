import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`

const Header = styled.div`
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
`

const WelcomeMessage = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`

const MainContent = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: #666;
  font-weight: 600;
`

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const ActionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`

const ActionIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`

const ActionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`

const ActionDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const ActionButton = styled.button`
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #5b5bd6;
  }
`

const RecentActivity = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

const ActivityText = styled.div`
  flex: 1;
`

const ActivityTitle = styled.div`
  font-weight: 600;
  color: #333;
`

const ActivityTime = styled.div`
  font-size: 0.9rem;
  color: #666;
`

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [wardrobeCount, setWardrobeCount] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    setUser(JSON.parse(userData))
    
    // Get wardrobe count
    const wardrobe = JSON.parse(localStorage.getItem('wardrobe') || '[]')
    setWardrobeCount(wardrobe.length)
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  const recentActivities = [
    { icon: '👗', title: 'Added new blouse to wardrobe', time: '2 hours ago' },
    { icon: '🤖', title: 'Received outfit recommendation', time: '1 day ago' },
    { icon: '📅', title: 'Planned weekly outfits', time: '3 days ago' },
    { icon: '⭐', title: 'Rated outfit suggestion', time: '5 days ago' }
  ]

  return (
    <Container>
      <Navbar user={user} />
      
      <Header>
        <WelcomeMessage>Welcome back, {user.name}! 👋</WelcomeMessage>
        <Subtitle>Ready to discover your next perfect outfit?</Subtitle>
      </Header>

      <MainContent>
        <StatsGrid>
          <StatCard>
            <StatNumber>{wardrobeCount}</StatNumber>
            <StatLabel>Items in Wardrobe</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>12</StatNumber>
            <StatLabel>Outfits Created</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>8</StatNumber>
            <StatLabel>Recommendations This Week</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>4.8</StatNumber>
            <StatLabel>Average Rating</StatLabel>
          </StatCard>
        </StatsGrid>

        <ActionGrid>
          <ActionCard>
            <ActionIcon>📸</ActionIcon>
            <ActionTitle>Upload Clothes</ActionTitle>
            <ActionDescription>
              Add new items to your virtual wardrobe by uploading photos of your clothes.
            </ActionDescription>
            <ActionButton onClick={() => router.push('/wardrobe')}>
              Manage Wardrobe
            </ActionButton>
          </ActionCard>

          <ActionCard>
            <ActionIcon>🤖</ActionIcon>
            <ActionTitle>Get Recommendations</ActionTitle>
            <ActionDescription>
              Tell us about your event and get personalized outfit suggestions from your wardrobe.
            </ActionDescription>
            <ActionButton onClick={() => router.push('/recommendations')}>
              Get Outfit Ideas
            </ActionButton>
          </ActionCard>

          <ActionCard>
            <ActionIcon>📅</ActionIcon>
            <ActionTitle>Plan Weekly Looks</ActionTitle>
            <ActionDescription>
              Plan your outfits for the week ahead with our calendar integration.
            </ActionDescription>
            <ActionButton onClick={() => alert('Coming soon!')}>
              Plan Outfits
            </ActionButton>
          </ActionCard>
        </ActionGrid>

        <RecentActivity>
          <SectionTitle>Recent Activity</SectionTitle>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityText>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityText>
            </ActivityItem>
          ))}
        </RecentActivity>
      </MainContent>
    </Container>
  )
}
