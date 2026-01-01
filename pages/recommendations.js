import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'

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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const PromptSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const PromptTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`

const PromptInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
    outline: none;
  }
`

const ExamplePrompts = styled.div`
  margin-top: 1rem;
`

const ExampleTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`

const ExampleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ExamplePrompt = styled.button`
  background: #f3f4f6;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: #6366f1;
    color: white;
  }
`

const GenerateButton = styled.button`
  background: #6366f1;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #5b5bd6;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

const RecommendationsSection = styled.div`
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

const OutfitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const OutfitCard = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
    transform: translateY(-5px);
  }

  ${props => props.featured && `
    border-color: #6366f1;
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
  `}
`

const OutfitHeader = styled.div`
  padding: 1rem;
  background: ${props => props.featured ? '#f0f4ff' : '#f8fafc'};
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OutfitTitle = styled.div`
  font-weight: 600;
  color: #333;
`

const OutfitRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.9rem;
`

const OutfitImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #9ca3af;
`

const OutfitInfo = styled.div`
  padding: 1rem;
`

const OutfitDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`

const OutfitItems = styled.div`
  margin-bottom: 1rem;
`

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ItemTag = styled.span`
  background: #f3f4f6;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
`

const OutfitActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  background: ${props => props.$primary ? '#6366f1' : '#f3f4f6'};
  color: ${props => props.$primary ? 'white' : '#666'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.$primary ? '#5b5bd6' : '#e5e7eb'};
  }
`

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`

const LoadingIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`

const EmptyText = styled.p`
  margin-bottom: 2rem;
`

export default function Recommendations() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login')
    }
  }, [isSignedIn, isLoaded, router])

  const examplePrompts = [
    "Office meeting tomorrow at 2 PM",
    "Date night at a fancy restaurant",
    "Weekend brunch with friends",
    "Gym workout session",
    "Casual coffee meetup",
    "Formal business presentation"
  ]

  const handleGenerateRecommendations = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (res.ok) {
        const data = await res.json()
        setRecommendations(data.recommendations || [])
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to generate recommendations')
      }
    } catch (error) {
      console.error('Error generating recommendations:', error)
      alert('Failed to generate recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt)
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Navbar />
      
      <Header>
        <Title>AI Outfit Recommendations</Title>
        <Subtitle>Describe your event and get personalized outfit suggestions</Subtitle>
      </Header>

      <MainContent>
        <PromptSection>
          <PromptTitle>What's the occasion?</PromptTitle>
          <PromptInput
            placeholder="Tell us about your event, the weather, your mood, or any specific requirements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <ExamplePrompts>
            <ExampleTitle>Try these examples:</ExampleTitle>
            <ExampleList>
              {examplePrompts.map((example, index) => (
                <ExamplePrompt
                  key={index}
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </ExamplePrompt>
              ))}
            </ExampleList>
          </ExamplePrompts>

          <GenerateButton
            onClick={handleGenerateRecommendations}
            disabled={!prompt.trim() || loading}
          >
            {loading ? 'Generating Recommendations...' : 'Get Outfit Ideas'}
          </GenerateButton>
        </PromptSection>

        <RecommendationsSection>
          <SectionTitle>Your Personalized Recommendations</SectionTitle>
          
          {loading ? (
            <LoadingState>
              <LoadingIcon>🤖</LoadingIcon>
              <div>Our AI stylist is analyzing your wardrobe and preferences...</div>
            </LoadingState>
          ) : recommendations.length === 0 ? (
            <EmptyState>
              <EmptyIcon>👗</EmptyIcon>
              <EmptyTitle>Ready for outfit inspiration?</EmptyTitle>
              <EmptyText>
                Describe your event or occasion above to get personalized outfit recommendations from your wardrobe.
              </EmptyText>
            </EmptyState>
          ) : (
            <OutfitGrid>
              {recommendations.map(outfit => (
                <OutfitCard key={outfit.id} featured={outfit.featured}>
                  <OutfitHeader featured={outfit.featured}>
                    <OutfitTitle>{outfit.title}</OutfitTitle>
                    <OutfitRating>
                      ⭐ {outfit.rating}
                    </OutfitRating>
                  </OutfitHeader>
                  
                  <OutfitImage>
                    {outfit.featured ? '👑' : '👔'}
                  </OutfitImage>
                  
                  <OutfitInfo>
                    <OutfitDescription>{outfit.description}</OutfitDescription>
                    
                    <OutfitItems>
                      <ItemList>
                        {outfit.items.map((item, index) => (
                          <ItemTag key={index}>{item}</ItemTag>
                        ))}
                      </ItemList>
                    </OutfitItems>
                    
                    <OutfitActions>
                      <ActionButton $primary>Try This Look</ActionButton>
                      <ActionButton>Save Outfit</ActionButton>
                      <ActionButton>Get Alternatives</ActionButton>
                    </OutfitActions>
                  </OutfitInfo>
                </OutfitCard>
              ))}
            </OutfitGrid>
          )}
        </RecommendationsSection>
      </MainContent>
    </Container>
  )
}
