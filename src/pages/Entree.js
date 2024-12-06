import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const Entree = () => {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [formValues, setFormValues] = useState({
    date: null,
    installation: null,
    matricule: '',
    puissance: '',
    vitesse: '',
    marque: '',
    voltage: '',
    isolement_Stat: false,
    isolement_Rot: false,
    observation: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/installations')
      .then(response => setInstallations(response.data.map(inst => ({ value: inst.name, label: inst.name }))))
      .catch(error => console.error('Error fetching installations:', error));
    
    axios.get('http://localhost:3001/api/entrees')
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching entries:', error));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (newValue) => {
    setFormValues({
      ...formValues,
      date: newValue,
    });
  };

  const handleInstallationChange = (newValue) => {
    setFormValues({
      ...formValues,
      installation: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEntry = {
      date: formValues.date,
      installation: formValues.installation.value || formValues.installation,
      matricule: formValues.matricule,
      puissance: formValues.puissance,
      vitesse: formValues.vitesse,
      marque: formValues.marque,
      voltage: formValues.voltage,
      isolement_Stat: formValues.isolement_Stat,
      isolement_Rot: formValues.isolement_Rot,
      observation: formValues.observation,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/api/entrees', newEntry);
      setEntries([...entries, response.data]);
      setFormValues({
        date: null,
        installation: null,
        matricule: '',
        puissance: '',
        vitesse: '',
        marque: '',
        voltage: '',
        isolement_Stat: false,
        isolement_Rot: false,
        observation: '',
      });
      handleClose();
    } catch (error) {
      console.error('There was an error saving the entry:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '8px' }}>
        <Typography variant="h4" sx={{ mb: '4px', color: '#7e7e7e' }}>
          Entree
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            mb: '4px',
            borderRadius: 4,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#7e7e7e',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#ccc', // Lighter shade of primary for hover
            }
          }}
        >
          Ajouter une nouvelle entrée
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ backgroundColor: '#7e7e7e', color: '#ffffff' }}>
            Ajouter une nouvelle entrée
          </DialogTitle>
          <DialogContent sx={{ padding: '8px' }}>
            <form onSubmit={handleSubmit} style={{ marginTop: '8px' }}>
              <DateTimePicker
                label="Date & Heure"
                value={formValues.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: '8px' }}
                    InputProps={{ style: { color: '#7e7e7e' } }}
                  />
                )}
              />
              <CreatableSelect
                isClearable
                onChange={handleInstallationChange}
                options={installations}
                placeholder="Sélectionner ou créer une installation"
                value={formValues.installation}
                required
                sx={{ marginBottom: '8px' }}
              />
              <TextField
                label="Matricule"
                fullWidth
                name="matricule"
                value={formValues.matricule}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ marginBottom: '8px' }}
                InputProps={{ style: { color: '#7e7e7e' } }}
              />
              <TextField
                label="Puissance"
                fullWidth
                name="puissance"
                value={formValues.puissance}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ marginBottom: '8px' }}
                InputProps={{ style: { color: '#7e7e7e' } }}
              />
              <TextField
                label="Vitesse"
                fullWidth
                name="vitesse"
                value={formValues.vitesse}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ marginBottom: '8px' }}
                InputProps={{ style: { color: '#7e7e7e' } }}
              />
              <TextField
                label="Marque"
                fullWidth
                name="marque"
                value={formValues.marque}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ marginBottom: '8px' }}
                InputProps={{ style: { color: '#7e7e7e' } }}
              />
              <TextField
                label="Voltage"
                fullWidth
                name="voltage"
                value={formValues.voltage}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ marginBottom: '8px' }}
                InputProps={{ style: { color: '#7e7e7e' } }}
              />
              <Typography variant="h6" component="div" style={{ marginTop: '16px' }}>
                Isolement
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.isolement_Stat}
                    onChange={handleChange}
                    name="isolement_Stat"
                    required
                  />
                }
                label="Isolement Stat"
                sx={{ marginBottom: '8px' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.isolement_Rot}
                    onChange={handleChange}
                    name="isolement_Rot"
                    required
                  />
                }
                label="Isolement Rot"
                sx={{ marginBottom: '8px' }}
              />
              <TextField
                label="Observation"
                fullWidth
                name="observation"
                value={formValues.observation}
                onChange={handleChange}
                multiline
                rows={4}
                margin="normal"
                sx={{ marginBottom: '8px' }}
                InputProps={{ style: { color: '#7e7e7e' } }}
              />
              <DialogActions>
                <Button onClick={handleClose} color="error">
                  Annuler
                </Button>
                <Button type="submit" variant="contained"
                  sx={{
                    backgroundColor: '#7e7e7e',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#ccc', // Lighter shade of primary for hover
                    }
                  }}
                >
                  Soumettre
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)', padding: '4px' }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#7e7e7e', color: '#ffffff' }}>
                <TableRow>
                  <TableCell>Date & Heure</TableCell>
                  <TableCell>Installation</TableCell>
                  <TableCell>Matricule</TableCell>
                  <TableCell>Puissance</TableCell>
                  <TableCell>Vitesse</TableCell>
                  <TableCell>Marque</TableCell>
                  <TableCell>Voltage</TableCell>
                  <TableCell>Isolement Stat</TableCell>
                  <TableCell>Isolement Rot</TableCell>
                  <TableCell>Observation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.installation}</TableCell>
                    <TableCell>{entry.matricule}</TableCell>
                    <TableCell>{entry.puissance}</TableCell>
                    <TableCell>{entry.vitesse}</TableCell>
                    <TableCell>{entry.marque}</TableCell>
                    <TableCell>{entry.voltage}</TableCell>
                    <TableCell>{entry.isolement_Stat ? 'Oui' : 'Non'}</TableCell>
                    <TableCell>{entry.isolement_Rot ? 'Oui' : 'Non'}</TableCell>
                    <TableCell>{entry.observation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </LocalizationProvider>
  );
};

export default Entree;
