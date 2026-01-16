import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import AddPerson from './components/AddPerson'
import PersonsTable from './components/PersonsTable'
import Footer from './components/Footer'
import Login from './components/Login'

// Main Page Component
function MainPage({ refreshTrigger, handlePersonAdded, cursorGlowRef }) {
  return (
    <div className="app">
      <div ref={cursorGlowRef} className="cursor-glow"></div>

      <Header />

      {/* Main Content - Two Column Layout */}
      <div className="main-content">
        <div className="content-left">
          <AddPerson onPersonAdded={handlePersonAdded} />
        </div>
        <div className="content-right">
          <PersonsTable refreshTrigger={refreshTrigger} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const cursorGlowRef = useRef(null)

  const handlePersonAdded = (newPerson) => {
    // Trigger refresh of PersonsTable
    setRefreshTrigger(prev => prev + 1)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update cursor glow position
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`
        cursorGlowRef.current.style.top = `${e.clientY}px`
        cursorGlowRef.current.classList.add('active')
      }
    }

    const handleMouseLeave = () => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.classList.remove('active')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage refreshTrigger={refreshTrigger} handlePersonAdded={handlePersonAdded} cursorGlowRef={cursorGlowRef} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
