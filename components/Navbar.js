import styled from 'styled-components'
import Link from 'next/link'
import { useUser, useClerk } from '@clerk/nextjs'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #6366f1;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`

const NavLink = styled(Link)`
  color: #666;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #6366f1;
  }
`

const Button = styled.button`
  background: ${props => props.$primary ? '#6366f1' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#6366f1'};
  border: ${props => props.$primary ? 'none' : '2px solid #6366f1'};
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$primary ? '#5b5bd6' : '#6366f1'};
    color: white;
  }
`

export default function Navbar() {
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  return (
    <Nav>
      <Logo>StyleAI</Logo>
      <NavLinks>
        {isSignedIn ? (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/wardrobe">Wardrobe</NavLink>
            <NavLink href="/recommendations">Recommendations</NavLink>
            <Button onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <Link href="/signup">
              <Button $primary>Sign Up</Button>
            </Link>
          </>
        )}
      </NavLinks>
    </Nav>
  )
}
