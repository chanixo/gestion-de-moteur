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

const theme = {
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  },
  typography: {
    fontSize: 16,
    lineHeight: 1.5
  },
  colors: {
    primary: '#7e7e7e',
    primaryLight: '#ccc', // Lighter shade of primary for hover
    background: '#f0f2f5'
  }
};

const styles = {
  textField: {
    '& .MuiInputBase-input': {
      color: '#7e7e7e', // Couleur de texte grise
    },
  },
};

const Pose = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [installation, setInstallation] = useState(null);
  const [installations, setInstallations] = useState([]);
  const [matricule, setMatricule] = useState('');
  const [puissance, setPuissance] = useState('');
  const [vitesse, setVitesse] = useState('');
  const [marque, setMarque] = useState('');
  const [voltage, setVoltage] = useState('');
  const [isolementStat, setIsolementStat] = useState('');
  const [isolementRot, setIsolementRot] = useState('');
  const [observation, setObservation] = useState('');
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/installations')
      .then(response => setInstallations(response.data.map(inst => ({ value: inst.name, label: inst.name }))))
      .catch(error => console.error(error));
    
    axios.get('http://localhost:3001/api/poses')
      .then(response => setPoses(response.data))
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
    let newInstallation = null;

    if (!installations.find(inst => inst.value === installation.value)) {
      try {
        const response = await axios.post('http://localhost:3001/api/installations', { name: installation.value });
        newInstallation = response.data;
        setInstallations([...installations, { value: newInstallation.name, label: newInstallation.name }]);
      } catch (error) {
        console.error(error);
      }
    }

    const newPose = {
      date,
      installation: installation.value || installation,
      matricule,
      puissance,
      vitesse,
      marque,
      voltage,
      isolementStat,
      isolementRot,
      observation
    };

    try {
      const response = await axios.post('http://localhost:3001/api/poses', newPose);
      setPoses([...poses, response.data]);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInstallationChange = (newValue) => {
    setInstallation(newValue);
  };

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh', padding: theme.spacing.md }}>
      <Typography variant="h4" sx={{ mb: theme.spacing.sm, color: theme.colors.primary }}>
        Pose
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{
          mb: theme.spacing.sm,
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: theme.colors.primary,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.colors.primaryLight // Change color on hover
          }
        }}
      >
        Ajouter un nouveau pose
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: theme.colors.primary, color: '#ffffff' }}>
          Ajouter un nouveau pose
        </DialogTitle>
        <DialogContent sx={{ padding: theme.spacing.md }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: theme.spacing.sm }}>
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
                    sx={{ mb: theme.spacing.sm }}
                    className={styles.textField} // Appliquer la classe ici
                  />
                )}
              />
            </LocalizationProvider>
            <CreatableSelect
              isClearable
              onChange={handleInstallationChange}
              options={installations}
              placeholder="Sélectionner ou créer une installation"
              value={installation}
              sx={{ mb: theme.spacing.sm }}
            />
            <TextField
              label="Matricule"
              fullWidth
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Puissance"
              fullWidth
              value={puissance}
              onChange={(e) => setPuissance(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Vitesse"
              fullWidth
              value={vitesse}
              onChange={(e) => setVitesse(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Marque"
              fullWidth
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Voltage"
              fullWidth
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Isolement Stat"
              fullWidth
              value={isolementStat}
              onChange={(e) => setIsolementStat(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Isolement Rot"
              fullWidth
              value={isolementRot}
              onChange={(e) => setIsolementRot(e.target.value)}
              margin="normal"
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <TextField
              label="Observation"
              fullWidth
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField} // Appliquer la classe ici
            />
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Annuler
              </Button>
              <Button type="submit" variant="contained"
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.colors.primaryLight // Change color on hover
                  }
                }}
              >
                Soumettre
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Paper sx={{ width: '100%', overflow: 'hidden', mt: theme.spacing.md }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.colors.primary, color: '#ffffff' }}>
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
            {poses.map((pose) => (
              <TableRow key={pose.id}>
                <TableCell>{pose.date}</TableCell>
                <TableCell>{pose.installation}</TableCell>
                <TableCell>{pose.matricule}</TableCell>
                <TableCell>{pose.puissance}</TableCell>
                <TableCell>{pose.vitesse}</TableCell>
                <TableCell>{pose.marque}</TableCell>
                <TableCell>{pose.voltage}</TableCell>
                <TableCell>{pose.isolementStat}</TableCell>
                <TableCell>{pose.isolementRot}</TableCell>
                <TableCell>{pose.observation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Pose;
