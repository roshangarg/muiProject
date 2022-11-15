import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core";
import { blue, green, yellow } from "@material-ui/core/colors";
import { pink, red } from "@mui/material/colors";
import { db } from '../FirebaseConfig'
import { useEffect } from "react";
import { useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Grid from "@material-ui/core/Grid";
import Masonry from "react-masonry-css";

import { Container } from "@material-ui/core";
import { async } from "@firebase/util";

const useStyles=makeStyles({
  avatar:{
    backgroundColor:(card)=>{
      if(card.category=="money"){
        return green[700]
      }
      if(card.category=="last due"){
        return red[500]
      }
      if(card.category=="submitted"){
        return blue[500]
      }
      return pink[500]
    }
  }
})

const NoteCard = () => {
  const breakpoints = {
        default:3,
        1100:2,
        700:1,
      }
  const [card , setCard] = useState([])
  useEffect(() => {
   const unsub= onSnapshot(collection(db,'Notes'), (snapshot) => {
     setCard(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))

    })
  
    return () => {
      unsub();
    }
  }, [])
  const handleDelete = async(id) => {
    await deleteDoc(doc(db,"Notes",id))
  }
  const classes = useStyles(card)
  
  return (
 <div>
  <Container>
    <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {card.map((card) => (
        <Card key={card.id} elevation={1}>
        <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {
              card.category[0].toUpperCase()
            }
            

          </Avatar>
        }
          action={
            <IconButton onClick={() => handleDelete(card.id)} >
              <DeleteOutlined/>
            </IconButton>
          }
          title= {card.title}
          subheader={card.category}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                {card.detail}
            </Typography>
        </CardContent>
       
      </Card>
      ))
    }
       </Masonry>
       </Container>
    </div>
  );
};

export default NoteCard;
