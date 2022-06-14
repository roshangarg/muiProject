import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FormControlLabel, FormLabel, makeStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


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
  const [titleError,setTitleError] = useState(false)
  const [detailError,setDetailError]= useState(false)
  const [category ,setCategory] = useState('money')
  const history = useHistory()
  const handleSubmit =(e)=>{
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
    fetch('http://localhost:7000/notes',{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({title,detail,category})
    }).then(()=> history.push('/'))
    }
  }
  return (
    <Container>
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
        rows={4}
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
