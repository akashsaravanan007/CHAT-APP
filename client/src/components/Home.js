import React,{useState} from 'react'
import io from 'socket.io-client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MainCard from '../../src/MainCard';
import { gridSpacing } from '../../src/constant';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material';
import Chat from './Chat';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#252',
      contrastText: 'white',
    },
  },
});

const Nav = styled(AppBar)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}));
const Home = () => {

    const socket = io.connect("http://localhost:3001");

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

const joinRoom = () => {
  if (username !== "" && room !== "") {
    socket.emit("join_room", room);
  }
  setShowChat(true);
}


  return (
    <div>
      <ThemeProvider theme={customTheme}>
<Box sx={{ flexGrow: 1 }}>
     
      <Nav position="absolute" color="primary" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color='inherit'
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>


          <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
              color='success'
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <Grid  item lg={13} md={3} sm={3} xs={6}>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{marginRight:'7rem'}}>
            CHAT APP
          </Typography>
          </Grid>
          {auth && (
            <div>
                 
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
              
            </div>
          )}
        </Toolbar>
      </Nav>
      </Box>

{/* Chat UI */}

<div style={{marginTop:'7rem'}}>
                                <MainCard title="JOIN A CHAT">
                                <Grid container spacing={gridSpacing}>
                    <Grid item xs={4} sm={4} md={4} lg={5}>
                      <TextField
                        id="outlined-basic"
                        label="Name:"
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                        variant="outlined"
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Room Id:"
                        variant="outlined"
                        onChange={(event) => {
                          setRoom(event.target.value);
                        }}
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={3}>

<Button variant="contained" color="secondary" size="small" name="close"
onClick={joinRoom}
  style={{ lineHeight: 2.5 }}
>
  Join a Room
</Button>
</Grid>

{showChat && <Chat socket={socket} username={username} room={room}/>}

                  </Grid>
                                </MainCard>
                               
                                </div>
                                </ThemeProvider>
    </div>
  )
}

export default Home