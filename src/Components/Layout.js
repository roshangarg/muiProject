import { makeStyles } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import { Typography } from "@material-ui/core";
import React from "react";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import {AddCircleOutlineOutlined, SubjectOutlined} from "@material-ui/icons"
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { format } from "date-fns";
import Avatar from '@material-ui/core/Avatar';

const drawerwidth = 240;
const useStyles = makeStyles((theme)=>{
  return{
  page: {
      backgroundColor:"#f9f9f9",
      width: '100%',
      padding:theme.spacing(3)
  },
  drawer:{
    width : drawerwidth
  },
  drawerpaper:{
    width : drawerwidth
  },
  root:{
      display:"flex"
  },
  active:{
    background:"#f4f4f4"
  },
  title:{
    padding:theme.spacing(2)
  },
  appbar:{
    width:`calc(100% - ${drawerwidth}px)`
  },
  toolbar:theme.mixins.toolbar,
  Date:{
    flexGrow:1
  },
  avatar:{
    marginLeft:theme.spacing(2)
  }
}
});
const Layout = ({ children }) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItem = [
      {
        text: "My Notes",
        icon : <SubjectOutlined color="secondary"/>,
        path:"/"
      },
      {
        text: "Create Notes",
        icon : <AddCircleOutlineOutlined color="secondary"/>,
        path:"/create"
      }
    ]
  return (
    
    <div className={classes.root}>
        {/* App bar */}
        <AppBar elevation={0} className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.Date}>
            {format(new Date(),'do MMMM Y')}
            </Typography>
            <Typography>
              Roshan
            </Typography>
            <Avatar src ="/roshan.jpg" className={classes.avatar}/>
          </Toolbar>
        </AppBar>

        {/* side drawer */}
        <Drawer 
         className = {classes.drawer}
         variant="permanent"
         anchor="left"
         classes={{paper:classes.drawerpaper}}
        >
            <div>
                <Typography variant="h5" className={classes.title}>
                    Roshan Notes
                </Typography>
            </div>
            {/* List item links */}
          <List>
            {menuItem.map( item =>(
              <ListItem 
                button
                onClick={() => history.push(item.path)}
                className={location.pathname==item.path ? classes.active:null}
                key={item.text}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
            ))}  
          </List>
        </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
          {children}
        </div>
    </div>
  );
};

export default Layout;
