import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notes App
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/">
              Boards
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header