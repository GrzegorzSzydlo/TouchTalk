import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Route, NavLink} from "react-router-dom";
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MessageIcon from '@material-ui/icons/Message';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notifications from "./Notifications";
import Messages from "./Messages";
import Tasks from "./Tasks";
import Calls from "./Calls";
import Teams from "./Teams";
import accountSettings from './accountSettings/AccountSettings.jsx';
import {  } from "module";
import "../style/Home.css";

import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserDetails} from "../actions/getUserDetails";
import {Button} from "@material-ui/core";
import {signout} from "../actions/auth";


function detectMob() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
}

const Home = () => {

    useEffect(() => {
        getUserDetails().then(res=>{
            dispatch({type: 'USERDATA', payload: res.data.userDetails})
        })
    }, []);

    const auth = useSelector(state => state.auth)
    const userData = useSelector(state => state.auth.userData)
    const history = useHistory()
    const dispatch = useDispatch();
    if (!auth.login)
        history.push('/');

    const handleLogout = () => {
        dispatch(signout()).then(() => {
            history.replace("/");
        });
    }

    const handleMessage = () => {
        history.push("/message");
    }

    

    let menu = {};
    let  menuWidth = 2;
    let  content = {};
    let  contentWidth = 10;
    if (detectMob()){
        menu ={
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
        };
        menuWidth = 12;
        content = {
            display: 'flex',
            flexDirection: 'column-reverse',
            padding: 0
        };
        contentWidth = 12;
    }
    console.log(userData ? "ok" : "nie")
    return (
        <section>
            <AppBar position="relative">
                <div class='right-navbar'>
                    <div className="navList">
                        <div className="navList2">
                            <div class='photo1'>
                                <Avatar alt="User1" src={userData.image ? userData.image : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'} />
                            </div>
                            <Typography variant="h6" >
                                {userData ? userData.name : null} {userData ? userData.surname : null}
                            </Typography>
                        </div>
                        <div align="flex-end">
                            <div class='talk'>
                                <button><PersonAddSharpIcon/></button>
                                <button><VideocamSharpIcon/></button>
                                <button><PhoneSharpIcon/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </AppBar>
            
            {/*<Grid container style={content}>*/}
            <Grid container className={"new-container"}>
                <Grid item xs={2}>
                    {/*<Divider orientation='horizontal'></Divider>*/}

                    <div class='navbar-left'>
                        <List style={menu}>
                            <ListItem>
                                <NavLink to='/messages'>
                                    <Button>
                                        <MessageIcon/>
                                        Wiadomości
                                    </Button>
                                </NavLink>
                            </ListItem>

                            <ListItem>
                                <NavLink to='/tasks'>
                                    <Button>
                                        <FormatListBulletedIcon/>
                                        Zadania
                                    </Button>
                                </NavLink>
                            </ListItem>
                            <ListItem>
                                <Button>
                                    <PhoneSharpIcon/>Rozmowy
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button>
                                    <GroupAddIcon/>
                                    Zespoły
                                </Button>
                            </ListItem>
                            {/*</ListItem>*/}
                            {/*<ListItem>*/}
                            {/*    <NavLink to='/messages'>*/}
                            {/*        <MessageIcon/>*/}
                            {/*        Wiadomości*/}
                            {/*    </NavLink>*/}
                            {/*</ListItem>*/}

                            {/*<ListItem>*/}
                            {/*    <NavLink to='/tasks'>*/}
                            {/*        <FormatListBulletedIcon/>*/}
                            {/*        Zadania*/}
                            {/*    </NavLink>*/}
                            {/*</ListItem>*/}
                            {/*<ListItem>*/}
                            {/*    <NavLink to='/calls'>*/}
                            {/*        <PhoneSharpIcon/>Rozmowy*/}
                            {/*    </NavLink>*/}
                            {/*</ListItem>*/}
                            {/*<ListItem>*/}
                            {/*    <NavLink to='/teams'>*/}
                            {/*        <GroupAddIcon/>*/}
                            {/*        Zespoły*/}
                            {/*    </NavLink>*/}
                            {/*</ListItem>*/}
                            <ListItem>
                                <NavLink to='/account'>
                                    <Button>
                                        Ustawienia
                                    </Button>
                                </NavLink>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={handleLogout}
                                >
                                    <ExitToAppIcon/>
                                    Wyloguj
                                </Button>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
                <Grid item xs={contentWidth}>
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/tasks" component={Tasks}/>
                    <Route path="/calls" component={Calls}/>
                    <Route path="/teams" component={Teams}/>
                    <Route path="/account" component={accountSettings}/>
                </Grid>
            </Grid>
        </section>
    );
};

export default Home;
