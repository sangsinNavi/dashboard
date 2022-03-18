import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManIcon from '@mui/icons-material/Man';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles, Dialog } from '@material-ui/core';

const useStyles = makeStyles({
  dialog: {
    position: 'fixed',
    left: -10,
    top: -10,
    width: 330,
    height: 800
  }
}); 

const DialogHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', position: 'fixed'}}>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        sx={{ mr: 2, ...(open && { display: 'none' }), width: 30, height: 30, left: 25, top: 30 }}
        style={{backgroundColor:'black', color:'white'}}
      >
        {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
      <IconButton 
        color="inherit"
        aria-label="close drawer"
        onClick={handleDrawerClose}
        sx={{ ...(!open && { display: 'none' }), width: 30, height: 30, left: 360, top:30}}
        style={{backgroundColor:'black', color:'white' }}
      >
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <Dialog
        classes={{
          paper: classes.dialog
        }}
        hideBackdrop
        open={open}
        disableEnforceFocus
        style={{ pointerEvents: 'none', opacity: 0.9 }}
        PaperProps={{ style: { pointerEvents: 'auto'} }}
      >
        <Divider />
        <List>
          {['상황도', '투명도', '도시요소', '군대부호'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <ManIcon /> : <PersonIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Email 문의', '전화문의', '사용 설명서'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? <MailIcon /> : index === 1 ? <CallIcon /> : <ContentPasteIcon /> }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  );
}
