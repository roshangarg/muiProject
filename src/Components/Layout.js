import { makeStyles } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import { Typography } from "@material-ui/core";
import React from "react";
import {IconButton} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { useState } from "react";
import {AddCircleOutlineOutlined, SubjectOutlined} from "@material-ui/icons"
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { format } from "date-fns";
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Box,
  Card,
  Container,
  FormControl,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
 
} from "@material-ui/core";

const drawerwidth = 240;
const useStyles = makeStyles((theme)=>{
  return{
  page: {
      backgroundColor:"#f9f9f9",
      width: '100%',
      height:'90vh',
      overflow:'scroll',
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
    const matches = useMediaQuery('(min-width:600px)');
    const isActive = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);
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
      {matches &&
      <div>
        {/* App bar */}
        <AppBar elevation={0} className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.Date}>
            {format(new Date(),'do MMMM Y')}
            </Typography>
            <Typography>
              Roshan
            </Typography>
            
          </Toolbar>
        </AppBar>
       

       
        
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
                style={{cursor:'pointer'}}
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
        </div>
}
{
  isActive && <div>
    <AppBar style={{background:'black' ,color:'white'}} elevation={0} >
          <Toolbar  >
          <IconButton
  edge="start"
  
  aria-label="icon drawer"
  onClick={() => {
    setOpen(true);
  }}
  
>
  <MenuIcon
   style={{color:'white'}}
    fontSize="large"
  />
</IconButton>
<SwipeableDrawer
  anchor="left"
  open={open}
  onClick={() => {
    setOpen(false);
  }}
  onOpen={() => {}}
>
  <div style={{ width: 240 }}>
    <Box marginTop='2rem' marginBottom='2rem' textAlign="center">Roshan Garg</Box>
    <List>
            {menuItem.map( item =>(
              <ListItem 
                button
                style={{cursor:'pointer'}}
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
  </div>
</SwipeableDrawer>
            <Typography className={classes.Date}>
            {format(new Date(),'do MMMM Y')}
            </Typography>
            <Typography>
              Roshan
            </Typography>
            
          </Toolbar>
        </AppBar>
  
</div>
}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
          {children}
      </div>
    </div>
  );
};

export default Layout;
