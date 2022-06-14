import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core";
import { blue, green, yellow } from "@material-ui/core/colors";
import { pink, red } from "@mui/material/colors";
const useStyles=makeStyles({
  avatar:{
    backgroundColor:(notes)=>{
      if(notes.category=="money"){
        return green[700]
      }
      if(notes.category=="last due"){
        return red[500]
      }
      if(notes.category=="submitted"){
        return blue[500]
      }
      return pink[500]
    }
  }
})
const NoteCard = ({ notes , handleDelete}) => {
  const classes = useStyles(notes)
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {
              notes.category[0].toUpperCase()
            }
          </Avatar>
        }
          action={
            <IconButton onClick={() => handleDelete(notes.id)} >
              <DeleteOutlined/>
            </IconButton>
          }
          title= {notes.title}
          subheader={notes.category}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                {notes.detail}
            </Typography>
        </CardContent>
       
      </Card>
    </div>
  );
};

export default NoteCard;
