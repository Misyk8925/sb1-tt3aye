import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import BoardList from './components/BoardList'
import Board from './components/Board'
import { useAuth } from './contexts/AuthContext'

const App: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              isAuthenticated ? <BoardList /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/board/:id"
            element={
              isAuthenticated ? <Board /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App