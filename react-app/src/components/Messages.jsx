import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import EmailIcon from '@material-ui/icons/Email';
import GifIcon from '@material-ui/icons/Gif';
import "./Messages.css"


import axios from "axios";
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '100%'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '76.5vh',
        overflowY: 'auto'
    },

    listScroll: {
        overflow: "scroll",
    }
});

const api = axios.create({
    baseURL: `http://localhost:8080`
})

let stompClient = null;
let receiverId = 0;

const Messages = () => {

    const auth = useSelector(state => state.auth)
    const history = useHistory()
    if (!auth.login)
        history.push('/');

    const classes = useStyles();

    let idActualUser = auth.user.user.id;
    let usersWidth = 3;
    let conversationWidth = 8;
    const [conversation, setConversation] = useState({'is': false});

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({
        type: "",
        content: "",
        sender: 0,
        receiver: 0
    })

    const [actualMessage, setActualMessage] = useState([]);

    useEffect(() => {
        api.get('/api/users').then(response => response.data)
            .then(data => setUsers(data))

    }, []);

    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);

    }

    const onConnected = () => {

        stompClient.subscribe('/user/' + idActualUser + "/reply", onMessageReceived);

    }
    const onMessageReceived = (payload) => {

        getMessage(receiverId);
    }

    const sendMessage = () => {

        if (stompClient) {
            stompClient.send("/app/sendPrivateMessage", {}, JSON.stringify(message));
            setMessage({...message, content: ""});

            setTimeout(() => {
                getMessage(receiverId);
                let a;
                console.log(a);
            }, 500);
        }
    }

    const handleClick = id => {
        receiverId = id;
        console.log(receiverId);
        setConversation({'is': true});
        setMessage({...message, sender: idActualUser, receiver: receiverId})
        getMessage(receiverId);
        connect();
    };

    const onError = (error) => {
        console.log("error");
    }

    const getMessage = receiverId => {
        api.get('/messagelist/' + idActualUser + "/" + receiverId).then(response => response.data)
            .then(data => {

                    setActualMessage(data)
                }
            )
        console.log("receiver" + receiverId);
    }


    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>

                <Grid item xs={3} className={classes.borderRight500}>
                    <AppBar position="static">
                        <div className="navList3">
                            <div className="navList2">
                                <Typography variant="h6">
                                    Czat
                                </Typography>
                                <button><ExpandMoreIcon/></button>
                            </div>
                            <div algin="flex-end">
                                <button><SearchIcon/></button>
                                {/* <InputBase
                                    inputProps={{ 'aria-label': 'search' }}
                                /> */}

                                {/* <div class="sea">
                                <InputBase placeholder="Search…"></InputBase>
                            </div> */}
                                <button><EmailIcon/></button>
                            </div>
                        </div>
                    </AppBar>
                    <List className={classes.listScroll}>
                        {users.map(user => (
                            <ListItem button onClick={() => handleClick(user.id)} key={user.id}>
                                <ListItemIcon>
                                    <Avatar alt={user.userDetails.name}
                                            src="https://material-ui.com/static/images/avatar/1.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={user.userDetails.name}/>
                                <ListItemText secondary="online" align="right"/>
                            </ListItem>
                        ))}
                    </List>
                </Grid>


                {conversation.is ? (
                    <Grid item xs={9}>
                        <List className={classes.messageArea}>

                            {actualMessage.map((messR) => (
                                (messR.sender !== idActualUser) ? (

                                    <ListItem key={messR.id}>
                                        <div class="photo">
                                            <Avatar alt="User"
                                                    src="https://material-ui.com/static/images/avatar/3.jpg"/>
                                        </div>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" primary={messR.content}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary={messR.dateTime.split("T")[0] + " " + messR.dateTime.split("T")[1].split(".")[0]}/>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ) : (

                                    <ListItem key={messR.id}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" primary={messR.content}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" secondary={messR.dateTime.split("T")[0] + " " + messR.dateTime.split("T")[1].split(".")[0]}/>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            ))}
                        </List>

                        <div class='bottom-bar'>
                            <Grid container style={{padding: '20px'}}>
                                <Grid item xs={11}>
                                    <TextField id="outlined-basic-email"
                                               label="Napisz nową wiadomość..."
                                               onChange={e => setMessage({
                                                   ...message,
                                                   content: e.target.value,
                                                   type: "CHAT"
                                               })}
                                               value={message.content}
                                               onKeyPress={event => {
                                                   if (event.key === 'Enter') {
                                                       sendMessage();
                                                   }
                                               }}
                                               fullWidth/>
                                    <button><TextFieldsIcon/></button>
                                    <button><WallpaperIcon/></button>
                                    <button><MoodIcon/></button>
                                    <button><GifIcon/></button>
                                </Grid>
                                <Grid xs={1} align="right">
                                    <button onClick={sendMessage} ><SendIcon/></button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ) : null}
            </Grid>
        </div>

    );
}

export default Messages;