import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/nextjs'

const Container = styled.div`
  min-height: 100vh;
`

const Hero = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const CTAButton = styled.button`
  background: white;
  color: #6366f1;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`

const Features = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled.div`
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

const FeatureIcon = styled.div`
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

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`

export default function Home() {
  const { isSignedIn } = useUser()

  const handleGetStarted = () => {
    if (isSignedIn) {
      window.location.href = '/dashboard'
    } else {
      window.location.href = '/signup'
    }
  }

  return (
    <Container>
      <Navbar />
      
      <Hero>
        <HeroTitle>AI-Powered Personal Stylist</HeroTitle>
        <HeroSubtitle>
          Upload your wardrobe, get personalized outfit recommendations, and never wonder "what should I wear?" again.
        </HeroSubtitle>
        <CTAButton onClick={handleGetStarted}>
          Start Your Style Journey
        </CTAButton>
      </Hero>

      <Features>
        <SectionTitle>Why Choose StyleAI?</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>👗</FeatureIcon>
            <FeatureTitle>Virtual Wardrobe</FeatureTitle>
            <FeatureDescription>
              Upload photos of your clothes and create a digital wardrobe that's always accessible.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>AI Recommendations</FeatureTitle>
            <FeatureDescription>
              Get personalized outfit suggestions based on weather, occasion, and your style preferences.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📅</FeatureIcon>
            <FeatureDescription>
              Plan your weekly outfits with calendar integration and never repeat the same look.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Fashion Panel</FeatureTitle>
            <FeatureDescription>
              Get expert reviews from our fashion panel to ensure you always look your best.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Virtual Try-On</FeatureTitle>
            <FeatureDescription>
              See how outfits look on you before wearing them with our AR try-on technology.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Style Analytics</FeatureTitle>
            <FeatureDescription>
              Track your style evolution and discover new fashion trends that match your personality.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Features>
    </Container>
  )
}
