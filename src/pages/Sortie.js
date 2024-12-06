import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const Sortie = () => {
  const [open, setOpen] = useState(false);
  const [sorties, setSorties] = useState([]);
  const [date, setDate] = useState(null);
  const [matricule, setMatricule] = useState('');
  const [observation, setObservation] = useState('');
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  // Fetch sorties data when component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/api/sorties')
      .then(response => {
        setSorties(response.data);
      })
      .catch(error => {
        console.error('Error fetching sorties data:', error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmDeleteIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSortie = {
      date,
      matricule,
      observation,
      deleted: false
    };

    // Post new sortie to the server
    axios.post('http://localhost:3001/api/sorties', newSortie)
      .then(response => {
        setSorties([...sorties, response.data]);
        setDate(null);
        setMatricule('');
        setObservation('');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding new sortie:', error);
      });
  };

  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (confirmDeleteIndex !== null) {
      const sortieToDelete = sorties[confirmDeleteIndex];
      
      // Assuming the sortie has an id property
      axios.delete(`http://localhost:3001/api/sorties/${sortieToDelete.id}`)
        .then(() => {
          const updatedSorties = sorties.map((sortie, index) => 
            index === confirmDeleteIndex ? { ...sortie, deleted: true } : sortie
          );
          setSorties(updatedSorties);
          setConfirmDeleteIndex(null);
        })
        .catch(error => {
          console.error('Error deleting sortie:', error);
        });
    }
  };

  const handleRestore = (index) => {
    const sortieToRestore = sorties[index];
    
    // Assuming the sortie has an id property
    axios.put(`http://localhost:3001/api/sorties/${sortieToRestore.id}`, { ...sortieToRestore, deleted: false })
      .then(() => {
        const updatedSorties = sorties.map((sortie, i) => 
          i === index ? { ...sortie, deleted: false } : sortie
        );
        setSorties(updatedSorties);
      })
      .catch(error => {
        console.error('Error restoring sortie:', error);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{
          mb: '16px',
          bgcolor: '#7e7e7e',
          color: '#fff',
          '&:hover': {
            bgcolor: '#555555',
          },
        }}
      >
        Add New Sortie
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ bgcolor: '#7e7e7e', color: '#ffffff' }}>Add New Sortie</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Time"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{ sx: { color: '#7e7e7e' } }}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Matricule"
              fullWidth
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              margin="normal"
              required
              InputProps={{ sx: { color: '#7e7e7e' } }}
            />
            <TextField
              label="Observation"
              fullWidth
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              InputProps={{ sx: { color: '#7e7e7e' } }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#7e7e7e',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#555555',
                  },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDeleteIndex !== null} onClose={() => setConfirmDeleteIndex(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the sortie?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={() => setConfirmDeleteIndex(null)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '16px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#7e7e7e', color: '#ffffff' }}>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>Matricule</TableCell>
              <TableCell>Observation</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorties.map((sortie, index) => (
              <TableRow key={index} style={{ textDecoration: sortie.deleted ? 'line-through' : 'none' }}>
                <TableCell>{sortie.date && new Date(sortie.date).toLocaleString()}</TableCell>
                <TableCell>{sortie.matricule}</TableCell>
                <TableCell>{sortie.observation}</TableCell>
                <TableCell>
                  {sortie.deleted ? (
                    <Button onClick={() => handleRestore(index)} color="primary">
                      Restore
                    </Button>
                  ) : (
                    <Button onClick={() => handleDelete(index)} color="secondary">
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Sortie;
