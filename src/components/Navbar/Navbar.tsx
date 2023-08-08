import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  background-color: #333;
  color: #fff;`

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

interface NavbarProps {
  // TODO
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar: React.FC<NavbarProps> = (_props) => {
  return (
    <StyledDiv>
      <StyledUl>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Explore</a>
        </li>
        <li>
          <a href="/">Profile</a>
        </li>
      </StyledUl>
    </StyledDiv>
  )
}


export default Navbar