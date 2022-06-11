import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Neumorphism } from '../pages/home/Home';

export function TemporaryDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
      <input type="text" placeholder="Title" autoFocus />
      <Divider />
      <input type="text" placeholder="Body" autoFocus />
        {['Post'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} onClick={toggleDrawer(anchor, false)} />
              <Divider />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

	const plusSButton = { width: '100%', cursor: 'pointer', border: 'none', backgroundColor: '#EAEBF3', color: '#333', };
  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Neumorphism w='100px' m='40px auto' thin>
          <Button onClick={toggleDrawer(anchor, true)} style={plusSButton}>+</Button>
        </Neumorphism>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}