import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FormControlLabel, FormLabel, makeStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { addDoc, collection, doc } from "firebase/firestore"; 
import { db } from '../FirebaseConfig'


import FormControl from '@material-ui/core/FormControl'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles(
  {
    field:{
      marginTop:20,
      marginBottom:20,
      display:"block"

    }
  }
);

const Create = () => {
  const classes = useStyles();
  const [title,setTitle] = useState('')
  const [detail,setDetail]= useState('')
  const [error , setError] = useState(false)
  const [titleError,setTitleError] = useState(false)
  const [detailError,setDetailError]= useState(false)
  const [category ,setCategory] = useState('money')
  const history = useHistory()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setTitleError(false)
    setDetailError(false)
    if(title==''){
      setTitleError(true)
    }
    if(detail==''){
      setDetailError(true)
    }
    if(title && detail){
      try{
        const collectionRef = collection(db,"Notes")
        const payload = {
          title,
          detail,
          category
        }
        await addDoc(collectionRef, payload)
        .then(()=> history.push('/'))
      }
      
      catch(err){
        setError(true)
        console.log(err)
      }
    }
  }
  return (
    <Container>
      {error && <span> something went wrong</span>}
      <Typography variant="h6" component="h2" color="secondary">
        Create a new Note
      </Typography>
      <br />
      <form noValidate autoComplete="off" onSubmit={handleSubmit} >
        <TextField
        onChange={(e)=> setTitle(e.target.value)}
        className={classes.field}
        label="Note title"
        variant="outlined"
        color="secondary"
        required
        fullWidth
        error={titleError}
        />
         <TextField
        onChange={(e)=> setDetail(e.target.value)}

        className={classes.field}
        label="Note details"
        variant="outlined"
        color="secondary"
        multiline
        minRows={4}
        required
        fullWidth
        error={detailError}

        />
        <FormControl className={classes.field}>
              <FormLabel > Note Category   </FormLabel>
                <RadioGroup value={category} onChange={(e)=> setCategory(e.target.value)}>
                <FormControlLabel control={<Radio/>} label="Money" value="money" />
                <FormControlLabel control={<Radio/>} label="Remainder" value="Remainder" />
                <FormControlLabel control={<Radio/>} label="Last Due" value="last due" />
                <FormControlLabel control={<Radio/>} label="submitted" value="submitted" />
                </RadioGroup>
        </FormControl>
    
         <Button
        type="submit"
        color="primary"
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
      >Submit</Button>
      </form>
     

      <br />
    </Container>
  );
};

export default Create;
