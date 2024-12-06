import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// Define some colors for the dashboard
const colors = {
  primary: '#1976d2',
  secondary: '#9c27b0',
  success: '#388e3c',
  warning: '#fbc02d',
  error: '#d32f2f',
  info: '#0288d1',
  background: '#f4f6f8',
  textPrimary: '#333',
  textSecondary: '#555',
  cardHeaderBg: '#e3f2fd',
  cardContentBg: '#fafafa',
  divider: '#e0e0e0',
  entree: '#FF8000', // Color for Entrée
  sortie: '#6D6C6A'  // Color for Sortie

};

const Dashboard = () => {
  const [poseData, setPoseData] = useState([]);
  const [deposeData, setDeposeData] = useState([]);
  const [entretienData, setEntretienData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  const [entreeData, setEntreeData] = useState([]);
  const [sortieData, setSortieData] = useState([]);

  useEffect(() => {
    // Fetch Pose data
    axios.get('http://localhost:3001/api/poses')
      .then(response => setPoseData(response.data))
      .catch(error => console.error('Error fetching pose data:', error));

    // Fetch Depose data
    axios.get('http://localhost:3001/api/deposes')
      .then(response => setDeposeData(response.data))
      .catch(error => console.error('Error fetching depose data:', error));
    
    // Fetch Entretien data
    axios.get('http://localhost:3001/api/entretiens')
      .then(response => setEntretienData(response.data))
      .catch(error => console.error('Error fetching entretien data:', error));

    // Fetch Vibration data
    axios.get('http://localhost:3001/api/vibrations')
      .then(response => setVibrationData(response.data))
      .catch(error => console.error('Error fetching vibration data:', error));
    
    axios.get('http://localhost:3001/api/entrees')
      .then(response => setEntreeData(response.data))
      .catch(error => console.error('Error fetching entree data:', error));

    // Fetch Sortie data
    axios.get('http://localhost:3001/api/sorties')
      .then(response => setSortieData(response.data))
      .catch(error => console.error('Error fetching sortie data:', error));
      
  }, []);

  // Calculate totals
  const totalPoses = poseData.length;
  const totalDeposes = deposeData.length;
  const totalEntretiens = entretienData.length;
  const totalVibrations = vibrationData.length;
  const totalEntree = entreeData.length;
  const totalSortie = sortieData.length;

  // Sample data structure for the bar chart
  const chartData1 = [
    {
      name: 'Poses',
      count: totalPoses,
    },
    {
      name: 'Deposes',
      count: totalDeposes,
    },
  ];

  const chartData2 = [
    {
      name: 'Entretien',
      count: totalEntretiens,
    },
    {
      name: 'Vibration',
      count: totalVibrations,
    },
  ];
  const pieChartData = [
    { name: 'Entrée', value: totalEntree },
    { name: 'Sortie', value: totalSortie }
  ];

  // Define a constant for card styles to ensure uniform sizing
  const cardStyles = {
    width: 300, // fixed width
    height: 200, // fixed height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '10px 8px', // margin for spacing between cards
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    backgroundColor: colors.cardContentBg,
  };

  const projectTitleStyle = {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: colors.textPrimary,
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)', // For 3D effect
    border: `2px solid ${colors.primary}`, // Cadre effect
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    backgroundColor: colors.cardHeaderBg,
  };
  
  
  

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', padding: 4 }}>
      <Typography component="h1" style={projectTitleStyle}>
        Gestion des applications fullstack
      </Typography>

      <Typography variant="h4" sx={{ mb: 3, color: colors.primary }}>Dashboard</Typography>
      
      {/* Flex container for cards */}
      <Box
        display="flex"
        justifyContent="center" // Center items horizontally
        flexWrap="wrap" // Wrap items if they overflow
        gap={2} // Space between items
        sx={{ mb: 4 }}
      >
        <Card style={cardStyles}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: colors.primary }}>E</Avatar>}
            title="Entretiens"
            subheader="Voir les entretiens"
            sx={{ backgroundColor: colors.cardHeaderBg }}
          />
          <CardContent>
            <Typography variant="body1" color={colors.textSecondary}>
              Total: {totalEntretiens}
            </Typography>
            <Button
              component={Link}
              to="/entretien"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Voir les entretiens
            </Button>
          </CardContent>
        </Card>

        <Card style={cardStyles}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: colors.secondary }}>V</Avatar>}
            title="Vibration"
            subheader="Voir les vibrations"
            sx={{ backgroundColor: colors.cardHeaderBg }}
          />
          <CardContent>
            <Typography variant="body1" color={colors.textSecondary}>
              Total: {totalVibrations}
            </Typography>
            <Button
              component={Link}
              to="/vibration"
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Voir le matériel
            </Button>
          </CardContent>
        </Card>

        <Card style={cardStyles}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: colors.success }}>M</Avatar>}
            title="Maintenances"
            subheader="Voir les Maintenances"
            sx={{ backgroundColor: colors.cardHeaderBg }}
          />
          <CardContent>
            <Typography variant="body1" color={colors.textSecondary}>
              Total: {totalPoses + totalDeposes} {/* Example total for Maintenances */}
            </Typography>
            <Button
              component={Link}
              to="/maintenance"
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
            >
              Voir les maintenances
            </Button>
          </CardContent>
        </Card>

        <Card style={cardStyles}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: colors.warning }}>S</Avatar>}
            title="État de stock"
            subheader="Voir l'état de stock"
            sx={{ backgroundColor: colors.cardHeaderBg }}
          />
          <CardContent>
            <Typography variant="body1" color={colors.textSecondary}>
              Total: { totalEntree + totalSortie} {/* Example total for stock */}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                component={Link}
                to="/magazine/entree"
                variant="contained"
                color="warning"
              >
                Entrée
              </Button>
              <Button
                component={Link}
                to="/magazine/sortie"
                variant="contained"
                color="warning"
              >
                Sortie
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ mt: 2, mb: 4, borderColor: colors.divider }} />

{/* Container to hold all three charts in one row */}
<Box
  display="flex"
  justifyContent="space-between" // Space charts evenly
  gap={4} // Gap between charts
  sx={{ mb: 4 }}
>
  {/* Box for the first bar chart */}
  <Box sx={{ width: '33%', height: 300 }}>
    <Typography variant="h5" sx={{ mb: 2, color: colors.info }}>Statistiques des poses et deposes</Typography>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData1}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={colors.primary} />
      </BarChart>
    </ResponsiveContainer>
  </Box>

  {/* Box for the second bar chart */}
  <Box sx={{ width: '33%', height: 300 }}>
    <Typography variant="h5" sx={{ mb: 2, color: colors.info }}>Statistiques des mesures</Typography>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData2}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={colors.secondary} />
      </BarChart>
    </ResponsiveContainer>
  </Box>

  {/* Box for the pie chart */}
  <Box sx={{ width: '33%', height: 300 }}>
    <Typography variant="h5" sx={{ mb: 2, color: colors.info }}>Etat de Stock</Typography>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.name === 'Entrée' ? colors.entree : colors.sortie} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Box>
</Box>



      

      <Divider sx={{ mt: 2, mb: 2, borderColor: colors.divider }} />
    </Box>
    
  );
};

export default Dashboard;
