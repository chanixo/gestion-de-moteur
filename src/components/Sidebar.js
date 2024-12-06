import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton,
  Toolbar, Divider, Collapse
} from '@mui/material';
import {
  ExpandLess, ExpandMore, Menu as MenuIcon, Close as CloseIcon,
  Dashboard as DashboardIcon, Build as BuildIcon, Vibration as VibrationIcon,
  Settings as SettingsIcon, Store as StoreIcon, Logout as LogoutIcon
} from '@mui/icons-material';
import logo from "../assets/ilyasss.jpg";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const [magazineOpen, setMagazineOpen] = React.useState(false);
  const { logout } = useAuth(); // Use the useAuth hook to access the logout function
  const navigate = useNavigate(); // Hook for navigation

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleMagazine = () => {
    setMagazineOpen(!magazineOpen);
  };

  const handleOpenSidebar = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    navigate('/login'); // Redirect to login page
  };
  

  return (
    <div className="flex">
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? 240 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            backgroundColor: '#1a202c',
            color: 'white',
          },
        }}
      >
        <Toolbar className="flex items-center justify-between">
          <IconButton onClick={toggleDrawer} className="text-white">
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Avatar src={logo} alt="Logo" sx={{ height: 60, width: 60, ml: 1 }} />
        </Toolbar>
        <Divider />
        <List>
          <ListItem 
            button 
            component={Link} 
            to="/dashboard" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to="/entretien" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Entretien" />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to="/vibration" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <VibrationIcon />
            </ListItemIcon>
            <ListItemText primary="Vibration" />
          </ListItem>
          {/* <ListItem 
            button 
            component={Link} 
            to="/revision" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Revision" />
          </ListItem> */}
          <ListItem 
            button 
            component={Link} 
            to="/maintenance" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Maintenance" />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to="/pose" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Pose" />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to="/depose" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Depose" />
          </ListItem>
          <ListItem 
            button 
            onClick={toggleMagazine} 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Magazine" />
            {magazineOpen ? <ExpandLess className="text-white" /> : <ExpandMore className="text-white" />}
          </ListItem>
          <Collapse in={magazineOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem 
                button 
                component={Link} 
                to="/magazine/entree" 
                sx={{ 
                  pl: 4,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ListItemIcon className="text-white">
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Entree" />
              </ListItem>
              <ListItem 
                button 
                component={Link} 
                to="/magazine/sortie" 
                sx={{ 
                  pl: 4,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ListItemIcon className="text-white">
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Sortie" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem 
            button 
            onClick={handleLogout} 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon className="text-white">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className="flex-grow p-4">
        {/* This space is for the routed pages */}
        {!open && (
          <IconButton onClick={handleOpenSidebar} className="fixed top-4 left-4 text-white">
            <MenuIcon />
          </IconButton>
        )}
      </main>
    </div>
  );
};

export default Sidebar;
