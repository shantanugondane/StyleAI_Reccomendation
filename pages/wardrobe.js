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

const UploadSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const InputGroup = styled.div`
  flex: 1;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
    outline: none;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
    outline: none;
  }
`

const FileUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #6366f1;
    background: #f8fafc;
  }

  ${props => props.dragover && `
    border-color: #6366f1;
    background: #f0f4ff;
  `}
`

const FileInput = styled.input`
  display: none;
`

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

const UploadText = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`

const UploadSubtext = styled.div`
  color: #666;
  font-size: 0.9rem;
`

const AddButton = styled.button`
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
  min-width: 120px;

  &:hover {
    background: #5b5bd6;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const FilterButton = styled.button`
  background: ${props => props.active ? '#6366f1' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid ${props => props.active ? '#6366f1' : '#e5e7eb'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#5b5bd6' : '#f8fafc'};
  }
`

const WardrobeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`

const WardrobeItem = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`

const ItemImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #9ca3af;
`

const ItemInfo = styled.div`
  padding: 1rem;
`

const ItemName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`

const ItemCategory = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  background: ${props => props.danger ? '#ef4444' : '#f3f4f6'};
  color: ${props => props.danger ? 'white' : '#666'};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.danger ? '#dc2626' : '#e5e7eb'};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
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

export default function Wardrobe() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const [wardrobe, setWardrobe] = useState([])
  const [filter, setFilter] = useState('all')
  const [dragover, setDragover] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tops',
    image: null
  })
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push('/login')
        return
      }
      fetchWardrobe()
    }
  }, [isSignedIn, isLoaded, router])

  const fetchWardrobe = async () => {
    try {
      const res = await fetch('/api/wardrobe')
      if (res.ok) {
        const data = await res.json()
        setWardrobe(data.items || [])
      }
    } catch (error) {
      console.error('Failed to fetch wardrobe:', error)
    } finally {
      setLoading(false)
    }
  }

  // Smart categorization based on filename
  const categorizeItem = (filename) => {
    const name = filename.toLowerCase()
    
    // Tops
    if (name.includes('shirt') || name.includes('blouse') || name.includes('top') || 
        name.includes('tank') || name.includes('tee') || name.includes('sweater') || 
        name.includes('hoodie') || name.includes('jacket') || name.includes('blazer') ||
        name.includes('cardigan') || name.includes('polo')) {
      return 'Tops'
    }
    
    // Bottoms
    if (name.includes('pants') || name.includes('jeans') || name.includes('trousers') || 
        name.includes('shorts') || name.includes('skirt') || name.includes('leggings') ||
        name.includes('pant') || name.includes('bottom')) {
      return 'Bottoms'
    }
    
    // Dresses
    if (name.includes('dress') || name.includes('gown') || name.includes('jumpsuit') ||
        name.includes('romper') || name.includes('maxi') || name.includes('mini')) {
      return 'Dresses'
    }
    
    // Shoes
    if (name.includes('shoe') || name.includes('boot') || name.includes('sandal') || 
        name.includes('sneaker') || name.includes('heel') || name.includes('flat') ||
        name.includes('loafer') || name.includes('oxford') || name.includes('pump')) {
      return 'Shoes'
    }
    
    // Accessories
    if (name.includes('bag') || name.includes('purse') || name.includes('watch') || 
        name.includes('necklace') || name.includes('bracelet') || name.includes('ring') ||
        name.includes('earring') || name.includes('scarf') || name.includes('hat') ||
        name.includes('belt') || name.includes('sunglass') || name.includes('accessory')) {
      return 'Accessories'
    }
    
    // Default to Unknown if no match
    return 'Unknown'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file,
        name: file.name.split('.')[0] // Auto-fill name from filename
      }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    setDragover(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file,
        name: file.name.split('.')[0]
      }))
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.image) {
      alert('Please fill in all fields')
      return
    }

    try {
      // Upload image first
      const uploadFormData = new FormData()
      uploadFormData.append('file', formData.image)

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!uploadRes.ok) {
        throw new Error('Failed to upload image')
      }

      const uploadData = await uploadRes.json()

      // Create wardrobe item
      const itemRes = await fetch('/api/wardrobe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          imageUrl: uploadData.imageUrl,
        }),
      })

      if (!itemRes.ok) {
        throw new Error('Failed to create item')
      }

      const { item } = await itemRes.json()
      
      // Update local state
      setWardrobe([...wardrobe, item])
      
      // Reset form
      setFormData({
        name: '',
        category: 'Tops',
        image: null
      })
      setPreviewUrl(null)
      document.getElementById('fileInput').value = ''
      
      alert(`Item "${item.name}" added to ${item.category} category!`)
    } catch (error) {
      console.error('Error creating item:', error)
      alert('Failed to add item. Please try again.')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragover(true)
  }

  const handleDragLeave = () => {
    setDragover(false)
  }

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return
    }

    try {
      const res = await fetch(`/api/wardrobe/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setWardrobe(wardrobe.filter(item => item.id !== id))
      } else {
        throw new Error('Failed to delete item')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const editItem = async (id) => {
    const newCategory = prompt('Enter new category (Tops, Bottoms, Dresses, Shoes, Accessories):')
    if (newCategory && ['Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'].includes(newCategory)) {
      try {
        const res = await fetch(`/api/wardrobe/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: newCategory }),
        })

        if (res.ok) {
          const { item } = await res.json()
          setWardrobe(wardrobe.map(w => w.id === id ? item : w))
        } else {
          throw new Error('Failed to update item')
        }
      } catch (error) {
        console.error('Error updating item:', error)
        alert('Failed to update item. Please try again.')
      }
    }
  }

  const filteredWardrobe = filter === 'all' 
    ? wardrobe 
    : wardrobe.filter(item => item.category.toLowerCase() === filter.toLowerCase())

  if (!isLoaded || loading || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Navbar />
      
      <Header>
        <Title>My Wardrobe</Title>
        <Subtitle>Manage your virtual closet and upload new items</Subtitle>
      </Header>

      <MainContent>
        <UploadSection>
          <FormTitle>Add New Item to Wardrobe</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <InputGroup>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Blue Denim Shirt"
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                </Select>
              </InputGroup>
              
              <AddButton type="submit" disabled={!formData.name || !formData.image}>
                Add Item
              </AddButton>
            </FormRow>
            
            <InputGroup>
              <Label>Upload Photo</Label>
              <FileUploadArea
                dragover={dragover}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('fileInput').click()}
              >
                {previewUrl ? (
                  <div>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '150px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '0.5rem'
                      }} 
                    />
                    <UploadText>Click to change photo</UploadText>
                  </div>
                ) : (
                  <div>
                    <UploadIcon>📸</UploadIcon>
                    <UploadText>Upload Your Cloth Photo</UploadText>
                    <UploadSubtext>
                      Drag and drop image here, or click to browse
                    </UploadSubtext>
                  </div>
                )}
                <FileInput
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </FileUploadArea>
            </InputGroup>
          </Form>
        </UploadSection>

        <FilterSection>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Items ({wardrobe.length})
          </FilterButton>
          <FilterButton
            active={filter === 'tops'}
            onClick={() => setFilter('tops')}
          >
            Tops
          </FilterButton>
          <FilterButton
            active={filter === 'bottoms'}
            onClick={() => setFilter('bottoms')}
          >
            Bottoms
          </FilterButton>
          <FilterButton
            active={filter === 'dresses'}
            onClick={() => setFilter('dresses')}
          >
            Dresses
          </FilterButton>
          <FilterButton
            active={filter === 'shoes'}
            onClick={() => setFilter('shoes')}
          >
            Shoes
          </FilterButton>
          <FilterButton
            active={filter === 'accessories'}
            onClick={() => setFilter('accessories')}
          >
            Accessories
          </FilterButton>
        </FilterSection>

        {filteredWardrobe.length === 0 ? (
          <EmptyState>
            <EmptyIcon>👗</EmptyIcon>
            <EmptyTitle>
              {filter === 'all' ? 'Welcome! Let\'s build your wardrobe' : `No ${filter} found`}
            </EmptyTitle>
            <EmptyText>
              {filter === 'all' 
                ? 'Start by uploading photos of your clothes. Add at least 2-3 items to get personalized outfit recommendations!'
                : `Try uploading some ${filter} or check other categories.`
              }
            </EmptyText>
            {filter === 'all' && (
              <AddButton onClick={() => document.getElementById('fileInput').click()}>
                Upload Your First Item
              </AddButton>
            )}
          </EmptyState>
        ) : (
          <WardrobeGrid>
            {filteredWardrobe.map(item => (
              <WardrobeItem key={item.id}>
                <ItemImage>
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    '👕'
                  )}
                </ItemImage>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemCategory>{item.category}</ItemCategory>
                  <ItemActions>
                    <ActionButton onClick={() => editItem(item.id)}>Edit</ActionButton>
                    <ActionButton danger onClick={() => deleteItem(item.id)}>
                      Delete
                    </ActionButton>
                  </ItemActions>
                </ItemInfo>
              </WardrobeItem>
            ))}
          </WardrobeGrid>
        )}
      </MainContent>
    </Container>
  )
}
