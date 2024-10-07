import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material'
import axios from 'axios'

interface Note {
  id: number
  title: string
  content: string
}

const Board: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [notes, setNotes] = useState<Note[]>([])
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [id])

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://127.0.0.1:8000/note/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { board: id },
      })
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const createNote = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://127.0.0.1:8000/note/',
        { title: newNoteTitle, content: newNoteContent, board: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewNoteTitle('')
      setNewNoteContent('')
      fetchNotes()
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Board Notes
      </Typography>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id}>
            <ListItemText primary={note.title} secondary={note.content} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="New Note Title"
          variant="outlined"
          fullWidth
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Note Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={createNote}>
          Create Note
        </Button>
      </Box>
    </Box>
  )
}

export default Board