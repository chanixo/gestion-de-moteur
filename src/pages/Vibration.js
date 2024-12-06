import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography 
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';

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
    primaryLight: '#ccc',
    background: '#f0f2f5'
  }
};

const styles = {
  textField: {
    '& .MuiInputBase-input': {
      color: '#7e7e7e',
    },
  },
};

const Vibration = () => {
  const [vibrations, setVibrations] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    zones: [],
    installation: null,
    etatVisual: {
      presenceProduit: '',
      huileGraisse: '',
      ailettes: '',
      boulonneries: '',
      cable: '',
      plaqueABorne: '',
      graisseur: ''
    },
    mesures: {
      temperatureAvant: '',
      temperatureArriere: ''
    },
    vibration: {
      axial: '',
      vertical: '',
      horizontal: ''
    },
    observation: '',
    piecePointe: null
  });
  const [installations, setInstallations] = useState([]);

  useEffect(() => {
    fetchVibrations();
    fetchInstallations();
  }, []);

  const fetchVibrations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/vibrations');
      setVibrations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInstallations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/installations');
      setInstallations(response.data.map(inst => ({ value: inst.name, label: inst.name })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleZoneChange = async (event) => {
    const { value, checked } = event.target;
    let updatedZones = [...formData.zones];
    if (checked) {
      updatedZones.push(value);
    } else {
      updatedZones = updatedZones.filter(zone => zone !== value);
    }
    setFormData({ ...formData, zones: updatedZones });
    if (updatedZones.length > 0) {
      fetchInstallationsByZone(updatedZones);
    } else {
      setInstallations([]);
    }
  };

  const fetchInstallationsByZone = async (zones) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/vibrations/installations?zone=${zones.join(',')}`);
      setInstallations(response.data.map(inst => ({ value: inst.name, label: inst.name })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVisualChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, etatVisual: { ...formData.etatVisual, [name]: value } });
  };

  const handleMesureChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, mesures: { ...formData.mesures, [name]: value } });
  };

  const handleVibrationChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, vibration: { ...formData.vibration, [name]: value } });
  };

  const handleInstallationChange = (newValue) => {
    setFormData({ ...formData, installation: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newInstallation = null;

    if (!installations.find(inst => inst.value === formData.installation.value)) {
      try {
        const response = await axios.post('http://localhost:3001/api/installations', { name: formData.installation.value });
        newInstallation = response.data;
        setInstallations([...installations, { value: newInstallation.name, label: newInstallation.name }]);
      } catch (error) {
        console.error(error);
      }
    }

    const data = new FormData();
    data.append('date', formData.date);
    data.append('zones', JSON.stringify(formData.zones));
    data.append('installation', formData.installation.value);
    data.append('etatVisual', JSON.stringify(formData.etatVisual));
    data.append('mesures', JSON.stringify(formData.mesures));
    data.append('vibration', JSON.stringify(formData.vibration));
    data.append('observation', formData.observation);
    if (formData.piecePointe) {
      data.append('piecePointe', formData.piecePointe);
    }

    try {
      await axios.post('http://localhost:3001/api/vibrations/add', data);
      fetchVibrations();
      handleClose();
    } catch (error) {
      console.error('Error submitting vibration:', error.message);
    }
  };

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh', padding: theme.spacing.md }}>
      <Typography variant="h4" sx={{ marginBottom: theme.spacing.lg, color: theme.colors.primary }}>
        Vibration
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          mb: theme.spacing.sm,
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: theme.colors.primary,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.colors.primaryLight
          }
        }}
      >
        Ajouter une nouvelle vibration
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: theme.colors.primary, color: '#ffffff' }}>
          Ajouter une nouvelle vibration
        </DialogTitle>
        <DialogContent sx={{ padding: theme.spacing.md }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Date"
              type="date"
              name="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleInputChange}
              required
              sx={{ mb: theme.spacing.sm }}
              className={styles.textField}
            />
            <FormGroup>
              {['Stock', 'Charg', 'Decharge', 'Reprise'].map((zone) => (
                <FormControlLabel
                  key={zone}
                  control={
                    <Checkbox
                      value={zone}
                      checked={formData.zones.includes(zone)}
                      onChange={handleZoneChange}
                    />
                  }
                  label={zone}
                />
              ))}
            </FormGroup>
            <CreatableSelect
              isClearable
              onChange={handleInstallationChange}
              options={installations}
              placeholder="Sélectionner ou créer une installation"
              value={formData.installation}
              sx={{ mb: theme.spacing.sm }}
            />
            <TableContainer component={Paper} sx={{ mb: theme.spacing.sm }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Aspect</TableCell>
                    <TableCell>Bon</TableCell>
                    <TableCell>Mauvais</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {['presenceProduit', 'huileGraisse', 'ailettes', 'boulonneries', 'cable', 'plaqueABorne', 'graisseur'].map((aspect) => (
                    <TableRow key={aspect}>
                      <TableCell>{aspect}</TableCell>
                      <TableCell>
                        <Checkbox
                          name={aspect}
                          value="bon"
                          checked={formData.etatVisual[aspect] === 'bon'}
                          onChange={handleVisualChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          name={aspect}
                          value="mauvais"
                          checked={formData.etatVisual[aspect] === 'mauvais'}
                          onChange={handleVisualChange}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TextField
              label="Température Avant"
              type="number"
              name="temperatureAvant"
              fullWidth
              margin="normal"
              value={formData.mesures.temperatureAvant}
              onChange={handleMesureChange}
              sx={{ mb: theme.spacing.sm }}
            />
            <TextField
              label="Température Arrière"
              type="number"
              name="temperatureArriere"
              fullWidth
              margin="normal"
              value={formData.mesures.temperatureArriere}
              onChange={handleMesureChange}
              sx={{ mb: theme.spacing.sm }}
            />
            <TextField
              label="Vibration Axial"
              type="number"
              name="axial"
              fullWidth
              margin="normal"
              value={formData.vibration.axial}
              onChange={handleVibrationChange}
              sx={{ mb: theme.spacing.sm }}
            />
            <TextField
              label="Vibration Vertical"
              type="number"
              name="vertical"
              fullWidth
              margin="normal"
              value={formData.vibration.vertical}
              onChange={handleVibrationChange}
              sx={{ mb: theme.spacing.sm }}
            />
            <TextField
              label="Vibration Horizontal"
              type="number"
              name="horizontal"
              fullWidth
              margin="normal"
              value={formData.vibration.horizontal}
              onChange={handleVibrationChange}
              sx={{ mb: theme.spacing.sm }}
            />
            <TextField
              label="Observation"
              name="observation"
              fullWidth
              margin="normal"
              value={formData.observation}
              onChange={handleInputChange}
              sx={{ mb: theme.spacing.sm }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: theme.colors.primary,
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.colors.primaryLight,
                },
                mb: theme.spacing.sm,
              }}
            >
              Télécharger pièce Jointe
              <input
                type="file"
                hidden
                onChange={(e) => setFormData({ ...formData, pieceJointe: e.target.files[0] })}
              />
            </Button>

            <DialogActions>
              <Button onClick={handleClose} color="primary" sx={{ color: theme.colors.primary }}>
                Annuler
              </Button>
              <Button type="submit" color="primary" sx={{ color: theme.colors.primary }}>
                Soumettre
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Zones</TableCell>
              <TableCell>Installation</TableCell>
              <TableCell>Présence Produit</TableCell>
              <TableCell>Huile/Graisse</TableCell>
              <TableCell>Ailettes</TableCell>
              <TableCell>Boulonneries</TableCell>
              <TableCell>Câble</TableCell>
              <TableCell>Plaque à Borne</TableCell>
              <TableCell>Graisseur</TableCell>
              <TableCell>Température Avant</TableCell>
              <TableCell>Température Arrière</TableCell>
              <TableCell>Vibration Axial</TableCell>
              <TableCell>Vibration Vertical</TableCell>
              <TableCell>Vibration Horizontal</TableCell>
              <TableCell>Observation</TableCell>
              <TableCell>Pièce Jointe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vibrations.map((vibration) => (
              <TableRow key={vibration._id}>
                <TableCell>{new Date(vibration.date).toLocaleDateString()}</TableCell>
                <TableCell>{vibration.zones.join(', ')}</TableCell>
                <TableCell>{vibration.installation}</TableCell>
                <TableCell>{vibration.etatVisual.presenceProduit}</TableCell>
                <TableCell>{vibration.etatVisual.huileGraisse}</TableCell>
                <TableCell>{vibration.etatVisual.ailettes}</TableCell>
                <TableCell>{vibration.etatVisual.boulonneries}</TableCell>
                <TableCell>{vibration.etatVisual.cable}</TableCell>
                <TableCell>{vibration.etatVisual.plaqueABorne}</TableCell>
                <TableCell>{vibration.etatVisual.graisseur}</TableCell>
                <TableCell>{vibration.mesures.temperatureAvant}</TableCell>
                <TableCell>{vibration.mesures.temperatureArriere}</TableCell>
                <TableCell>{vibration.vibration.axial}</TableCell>
                <TableCell>{vibration.vibration.vertical}</TableCell>
                <TableCell>{vibration.vibration.horizontal}</TableCell>
                <TableCell>{vibration.observation}</TableCell>
                <TableCell>
                  {vibration.pieceJointe && (
                    <a href={`http://localhost:3001/uploads/${vibration.pieceJointe}`} target="_blank" rel="noopener noreferrer">
                      Voir
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Vibration;
