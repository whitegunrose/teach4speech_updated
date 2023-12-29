import React, { useState, useEffect } from 'react';
import { Button, Typography, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleDrawer = (open : any) => (event : any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (windowWidth > 850) {
    return (
      <nav className="landing-nav-bar">
        <Typography variant="h4">
          Teach4Speech
        </Typography>
        <nav className="landing-nav-buttons">
          <Button> About </Button>
          <Button> Info </Button>
          <Button> Contact </Button>
        </nav>
        <Button variant="contained">
          Instructor Sign-In
        </Button>
      </nav>    
    );
  } else {
    return (
      <nav className="landing-nav-bar">
        <Typography variant="h4">
          Teach4Speech
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className='landing-nav-bar-menu'>
              <Button> About </Button>
              <Button> Info </Button>
              <Button> Contact </Button>
              <Button variant="contained">
                Instructor Sign-In
              </Button>
            </div>
          </div>
        </Drawer>
      </nav>
    );
  }
}

export default Navbar;
