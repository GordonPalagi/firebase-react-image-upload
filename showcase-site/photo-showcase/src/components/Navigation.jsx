import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/joy/Box';
import { Drawer } from '@mui/joy';
import { ButtonGroup } from '@mui/joy';
import { Button } from '@mui/joy';
import { List } from '@mui/joy';
import { Divider } from '@mui/joy';
import { ListItem } from '@mui/joy';
import { ListItemButton } from '@mui/joy';
// import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";



function Navigation() {
  const [state, setState] = useState({
    sm: false,
  });

  const drawerLinks = [
    { name: "Home", path: "/" },
    { name: "Archive", path: "/archive" },
    { name: "Contact", path: "/contact" },
    { name: "About Kris", path: "/about" },
  ];

  const toggleDrawer = (size, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [size]: open });
  };

  const list = (size) => (
    <Box
      className="nav-drawer"
      role="presentation"
      onClick={toggleDrawer(size, false)}
      onKeyDown={toggleDrawer(size, false)}
    >
      <List>
        {drawerLinks.map(({name, path}) => (
          <ListItem key={name}>
            <ListItemButton><Link to={path} style={{color: 'black'}}>{name}</Link></ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );



  // const location = useLocation();
  // const { pathname } = location;

  
  return (
    <div className='navbar'>
    <div className='lower-navbar'>
      <div className='logo'>Palagi Did It</div>
      <ButtonGroup className="hamburger-menu-icon" variant="soft">
          <Button key={"sm"} onClick={toggleDrawer("sm", true)}>
            {/* <RxHamburgerMenu /> */}
            <GiHamburgerMenu style={{scale: '150%'}} />
          </Button>
      </ButtonGroup>
    </div>
      {["sm"].map((size) => (
        <Drawer
          anchor={"right"}
          key={size}
          size={size}
          open={state[size]}
          onClose={toggleDrawer(size, false)}
        >
          {list(size)}
        </Drawer>
      ))}
    </div>
  );
  }
  
  export default Navigation