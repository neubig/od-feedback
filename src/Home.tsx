// src/Home.tsx
import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <h1>OpenDevin Feedback Display</h1>
      <Link to="/show">Show Feedback</Link>
    </div>
  )
}

export default Home
