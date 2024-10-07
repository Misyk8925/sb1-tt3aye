import React, { useState, useEffect } from 'react'
import { Typography, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'

interface Board {
  id: number
  name: string
}

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([])
  const [newBoardName, setNewBoardName] = useState('')

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://127.0.0.1:8000/board/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBoards(response.data)
    } catch (error) {
      console.error('Error fetching boards:', error)
    }
  }

  const createBoard = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://127.0.0.1:8000/board/',
        { name: newBoardName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewBoardName('')
      fetchBoards()
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Boards
      </Typography>
      <List>
        {boards.map((board) => (
          <ListItem key={board.id} component={RouterLink} to={`/board/${board.id}`}>
            <ListItemText primary={board.name} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="New Board Name"
          variant="outlined"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={createBoard} sx={{ ml: 2 }}>
          Create Board
        </Button>
      </Box>
    </Box>
  )
}

export default BoardList