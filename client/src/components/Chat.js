import React, { useEffect, useState } from 'react'
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
import Paper from '@mui/material/Paper';
import { gridSpacing } from '../../src/constant';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material';
import moment from 'moment'


const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: moment().format("YYYY-MM-DD hh:mm:ss")
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div style={{ marginLeft: '25rem', marginTop: '5rem', width: '50%' }}>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg='12'>

                        <Typography variant="h6" component="div" style={{ textAlign: 'center' }}>
                            LIVE CHAT
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing}>
                    <Grid item lg='16'>
                        <Box style={{ marginLeft: '3rem' }}
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 2,
                                    width: 500,
                                    height: 350,
                                },
                            }}
                        >

                            <Paper elevation={3}
                            {...messageList.map((messageContent) => {
                                return <Typography>{messageContent.message}</Typography>
                            })}
                            />
                        </Box>

                    </Grid>
                </Grid>




                <Grid container spacing={gridSpacing}>
                    <Grid item lg='14'>
                        <TextField
                            id="outlined-basic"
                            label="Type Something..."
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            variant="outlined"
                            required
                            size="small"


                        />


                        <Button variant="contained" color="secondary" size="medium" name="close"
                            onClick={sendMessage}
                        >
                            &#9658;
                        </Button>
                    </Grid>

                </Grid>
            </MainCard>
        </div>
    )
}

export default Chat