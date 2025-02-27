import * as React from 'react';
import "./styles.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const url=import.meta.env.VITE_BASE_URL

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';


export default function Register() {
  const [record, setRecord] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate=useNavigate()

  const handleChange = (e) => {
    setRecord({...record,[e.target.name]:e.target.value});
    
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    try {
        axios.post(`${url}/user/register`,record)
        .then((res)=>{
            const msg=res.data
            alert(msg)
            navigate('/')
            
        })
        .catch((res)=>{
          alert("error in registering")
          console.log(res.data)

        })
    } catch (error) {
        console.log(error)
    }
  }
 
  return (
    <>
     <div className="form-navbar">
      <h4 style={{fontStyle:'italic'}}>shopSpicy</h4>
      </div>
      
      <div className='form-container' style={{paddingBottom:'80px'}}>
        <Container>
        <Box  className="form-box">
            <h1>Sign Up</h1>
      <TextField  name='username' label="User Name" variant="outlined" onChange={handleChange}/>
      <TextField  name='email' label="E-mail" variant="outlined" onChange={handleChange}/>
      <TextField  name='mobile' label="Mobile no." variant="outlined" onChange={handleChange}/>
      <FormControl >
      
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={record.userType}
          name='userType'
          label="User Type"
          
          onChange={handleChange}
        >
          <MenuItem  value={'farmer'}>Farmer</MenuItem>
          <MenuItem  value={'retailer'}>Retailer</MenuItem>
          <MenuItem  value={'wholsailer'}>Wholesailer</MenuItem>
        </Select>
      </FormControl>
      <FormControl  variant="outlined"  onChange={handleChange}>
          <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
          <OutlinedInput name='password'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
          />
        </FormControl>
        <Button style={{backgroundColor:'rgb(12, 155, 121)'}} variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <p style={{textAlign:'center'}}>Already registered?<a href="/" style={{textDecoration:'none'}}>Login</a></p>
    </Box>
    </Container>
        </div>
      
    </>
  );
}