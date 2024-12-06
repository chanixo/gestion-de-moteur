import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const Maintenance = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [zone, setZone] = useState(null);
  const [zones, setZones] = useState([]);
  const [installation, setInstallation] = useState('');
  const [typePanne, setTypePanne] = useState('');
  const [lieuReparation, setLieuReparation] = useState('');
  const [observation, setObservation] = useState('');
  const [pieceJointe, setPieceJointe] = useState(null);
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/zones')
      .then(response => setZones(response.data.map(zone => ({ value: zone.name, label: zone.name }))))
      .catch(error => console.error(error));
    
    axios.get('http://localhost:3001/api/maintenances')
      .then(response => setMaintenances(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMaintenance = {
      date,
      zone: zone.value || zone,
      installation,
      typePanne,
      lieuReparation,
      observation,
      pieceJointe
    };

    try {
      const response = await axios.post('http://localhost:3001/api/maintenances', newMaintenance);
      setMaintenances([...maintenances, response.data]);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleZoneChange = (newValue) => {
    setZone(newValue);
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: 16 }}>
      <Typography variant="h4" style={{ marginBottom: 8, color: '#7e7e7e' }}>
        Maintenance
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{
          marginBottom: 8,
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#7e7e7e',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#ccc'
          }
        }}
      >
        Ajouter une nouvelle maintenance
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#7e7e7e', color: '#ffffff' }}>
          Ajouter une nouvelle maintenance
        </DialogTitle>
        <DialogContent style={{ padding: 16 }}>
          <Box component="form" onSubmit={handleSubmit} style={{ marginTop: 8 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Heure"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    required
                    style={{ marginBottom: 8 }}
                    InputProps={{ style: { color: '#7e7e7e' } }}
                  />
                )}
              />
            </LocalizationProvider>
            <CreatableSelect
              isClearable
              onChange={handleZoneChange}
              options={zones}
              placeholder="Sélectionner ou créer une zone"
              value={zone}
              style={{ marginBottom: 8 }}
            />
            <TextField
              label="Installation"
              fullWidth
              value={installation}
              onChange={(e) => setInstallation(e.target.value)}
              margin="normal"
              required
              style={{ marginBottom: 8 }}
              InputProps={{ style: { color: '#7e7e7e' } }}
            />
            <TextField
              label="Type de Panne"
              fullWidth
              value={typePanne}
              onChange={(e) => setTypePanne(e.target.value)}
              margin="normal"
              required
              style={{ marginBottom: 8 }}
              InputProps={{ style: { color: '#7e7e7e' } }}
            />
            <TextField
              label="Lieu de Réparation"
              fullWidth
              value={lieuReparation}
              onChange={(e) => setLieuReparation(e.target.value)}
              margin="normal"
              required
              style={{ marginBottom: 8 }}
              InputProps={{ style: { color: '#7e7e7e' } }}
            />
            <TextField
              label="Observation"
              fullWidth
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              style={{ marginBottom: 8 }}
              InputProps={{ style: { color: '#7e7e7e' } }}
            />
            <TextField
              label="Pièce Jointe"
              fullWidth
              type="file"
              onChange={(e) => setPieceJointe(e.target.files[0])}
              margin="normal"
              style={{ marginBottom: 8 }}
              InputProps={{ style: { color: '#7e7e7e' } }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Annuler
              </Button>
              <Button type="submit"  variant="contained" color="primary"
               style={{backgroundColor: '#7e7e7e', color: '#fff','&:hover':
                 {backgroundColor: '#ccc'}
            }}
        > Soumettre
              </Button>

            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Paper style={{ width: '100%', overflow: 'hidden', marginTop: 16 }}>
        <Table>
          <TableHead style={{ backgroundColor: '#7e7e7e', color: '#ffffff' }}>
            <TableRow>
              <TableCell>Date & Heure</TableCell>
              <TableCell>Zone</TableCell>
              <TableCell>Installation</TableCell>
              <TableCell>Type de Panne</TableCell>
              <TableCell>Lieu de Réparation</TableCell>
              <TableCell>Observation</TableCell>
              <TableCell>Pièce Jointe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenances.map((maintenance) => (
              <TableRow key={maintenance._id}>
                <TableCell>{new Date(maintenance.date).toLocaleString()}</TableCell>
                <TableCell>{maintenance.zone}</TableCell>
                <TableCell>{maintenance.installation}</TableCell>
                <TableCell>{maintenance.typePanne}</TableCell>
                <TableCell>{maintenance.lieuReparation}</TableCell>
                <TableCell>{maintenance.observation}</TableCell>
                <TableCell>{maintenance.pieceJointe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Maintenance;
