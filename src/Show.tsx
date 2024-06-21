// src/Show.tsx
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Rest of the code...
import { useNavigate, useLocation } from 'react-router-dom'
import './App.css'

const Show: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [feedbackId, setFeedbackId] = useState<string>('')
  const [feedbackContent, setFeedbackContent] = useState<any>(null) // Add state for feedback content

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('feedback_id')
    if (id) {
      setFeedbackId(id)
      fetchFeedbackContent(id) // Fetch feedback content when feedback ID changes
    }
  }, [location.search])

  const fetchFeedbackContent = async (id: string) => {
    try {
      const response = await fetch('https://show-od-trajectory-3u9bw9tx.uc.gateway.dev/show-od-trajectory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedback_id: id })
      })
      const data = await response.json()
      setFeedbackContent(data) // Update feedback content state with the fetched data
    } catch (error) {
      toast.error('Error fetching feedback content')
      console.log(error)
    }
  }

  const updateFeedback = (id: string) => {
    setFeedbackId(id)
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('feedback_id', id)
    navigate({ search: searchParams.toString() })
    fetchFeedbackContent(id) // Fetch feedback content when feedback ID is updated
  }

  return (
    <div>
      <h1>Show OpenDevin Feedback</h1>
      <input type="text" value={feedbackId} onChange={(e) => updateFeedback(e.target.value)} />
      <button onClick={() => console.log(feedbackId)}>Update Feedback ID</button>
      {feedbackContent && (
        <div>
          <h2>Feedback Content</h2>
          <SyntaxHighlighter language="json" style={tomorrow}>
            {JSON.stringify(feedbackContent, null, 2)}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}

export default Show
