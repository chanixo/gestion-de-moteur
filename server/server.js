const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Import routes
const authRoutes = require('./routes/auth');
const entretienRoutes = require('./routes/entretiens');
const installationRoutes = require('./routes/installations');
const vibrationRoutes = require('./routes/vibrations'); // Import vibration routes
const poseRoutes = require('./routes/poses'); // Import pose routes
const deposeRoutes = require('./routes/deposes'); // Import depose routes
const entreeRoutes = require('./routes/entrees');
const maintenanceRoutes = require('./routes/maintenances');
const sortieRoutes = require('./routes/sorties'); // Import sortie routes


app.use('/api/entretiens', entretienRoutes); // Add this line to include entretien routes
app.use('/api/installations', installationRoutes); // Use installation routes
app.use('/api/vibrations', vibrationRoutes); // Use vibration routes
app.use('/api/poses', poseRoutes); // Use pose routes
app.use('/api/deposes', deposeRoutes); // Use depose routes
app.use('/api/entrees', entreeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/maintenances', maintenanceRoutes);
app.use('/api/sorties', sortieRoutes); // Use sortie routes


const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
