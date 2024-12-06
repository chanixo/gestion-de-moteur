// import React, { useState, useEffect } from 'react';
// import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
// import axios from 'axios';

// const Entretien = () => {
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState('');
//   const [installation, setInstallation] = useState('');
//   const [installations, setInstallations] = useState([]);
//   const [isolementStat, setIsolementStat] = useState('');
//   const [isolementRot, setIsolementRot] = useState('');
//   const [isolementRes, setIsolementRes] = useState('');
//   const [demarrageRot, setDemarrageRot] = useState('');
//   const [observation, setObservation] = useState('');
//   const [entretiens, setEntretiens] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const installationsResponse = await axios.get('http://localhost:3001/api/installations');
//         setInstallations(installationsResponse.data);

//         const entretiensResponse = await axios.get('http://localhost:3001/api/entretiens');
//         setEntretiens(entretiensResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newEntretien = { date, installation, isolementStat, isolementRot, isolementRes, demarrageRot, observation };
    
//     try {
//         const response = await axios.post('http://localhost:3001/api/entretiens', newEntretien);
//         setEntretiens([...entretiens, response.data]);
//       handleClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4">Entretien</Typography>
//       <Typography variant="body1">This is the Entretien page.</Typography>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Add New Entretien
//       </Button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Entretien</DialogTitle>
//         <DialogContent>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//             <TextField
//               label="Date"
//               type="date"
//               fullWidth
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel>Installation</InputLabel>
//               <Select
//                 value={installation}
//                 onChange={(e) => setInstallation(e.target.value)}
//               >
//                 {installations.map((inst) => (
//                   <MenuItem key={inst._id} value={inst.name}>
//                     {inst.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               label="Isolement Stat"
//               fullWidth
//               value={isolementStat}
//               onChange={(e) => setIsolementStat(e.target.value)}
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Isolement Rot"
//               fullWidth
//               value={isolementRot}
//               onChange={(e) => setIsolementRot(e.target.value)}
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Isolement Res"
//               fullWidth
//               value={isolementRes}
//               onChange={(e) => setIsolementRes(e.target.value)}
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Demarrage Rot"
//               fullWidth
//               value={demarrageRot}
//               onChange={(e) => setDemarrageRot(e.target.value)}
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Observation"
//               fullWidth
//               value={observation}
//               onChange={(e) => setObservation(e.target.value)}
//               margin="normal"
//               multiline
//               rows={4}
//             />
//             <DialogActions>
//               <Button onClick={handleClose} color="secondary">
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Box>
//         </DialogContent>
//       </Dialog>

//       <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Installation</TableCell>
//               <TableCell>Isolement Stat</TableCell>
//               <TableCell>Isolement Rot</TableCell>
//               <TableCell>Isolement Res</TableCell>
//               <TableCell>Demarrage Rot</TableCell>
//               <TableCell>Observation</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {entretiens.map((entretien) => (
//               <TableRow key={entretien._id}>
//                 <TableCell>{entretien.date}</TableCell>
//                 <TableCell>{entretien.installation}</TableCell>
//                 <TableCell>{entretien.isolementStat}</TableCell>
//                 <TableCell>{entretien.isolementRot}</TableCell>
//                 <TableCell>{entretien.isolementRes}</TableCell>
//                 <TableCell>{entretien.demarrageRot}</TableCell>
//                 <TableCell>{entretien.observation}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </div>
//   );
// };

// export default Entretien;
