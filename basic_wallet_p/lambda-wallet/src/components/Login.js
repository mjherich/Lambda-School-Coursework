import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppContext from '../state/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      display: "flex"
    },
  },
  box: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  }
}));

export default function Login() {
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const ctx = useContext(AppContext);

  const handleChange = e => {
    setInput(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    ctx.setState({
      ...ctx.state,
      id: input
    })
  }

  return (
    <Box display="flex" className={classes.box}>
      <div>
        <Typography variant="h2" style={{width: "100%"}}>Log In</Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="Enter Your ID" variant="outlined" value={input} onChange={handleChange} />
          <Button variant="contained" color="primary" type="submit">Let's Go!</Button>
        </form>
      </div>
    </Box>
  )
}