import * as React from 'react';
import "./styles.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const url=import.meta.env.VITE_BASE_URL

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { jwtDecode} from "jwt-decode";


export default function Login() {
  const [record, setRecord] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate=useNavigate()

  const handleChange = (e) => {
    setRecord({...record,[e.target.name]:e.target.value});
};

  const handleSubmit=(e)=>{
    e.preventDefault()
    try {
        axios.post(`${url}/user/login`,record)
        .then((res)=>{
            const response=res.data
            const token=response.token
            const decodetoken=jwtDecode(token)
            if(response.status==200){
                alert(response.msg)
                
                if(decodetoken.data.userType=="admin"){
                    navigate("/admin/dashboard")
                }
                else{
                  sessionStorage.setItem("token",token)
                  if(decodetoken.data.userType=="farmer"){
                    navigate("/user/farmer")
                  }
                  else if(decodetoken.data.userType=="wholsailer"){
                    navigate("/user/wholesailer")
                  }
                  else if(decodetoken.data.userType=="retailer"){
                    navigate("/user/retailer")
                  }
                }
            }
        })
        .catch((res)=>{
          alert("error while Logging in")
          console.log(res)
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
      <div className='form-container'>
        <Container>
        <Box  className="form-box">
            <h1>Log In</h1>
      <TextField  name='email' label="E-mail" variant="outlined" onChange={handleChange}/>
      <FormControl  variant="outlined"  onChange={handleChange}>
          <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
          <OutlinedInput name='password'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
          />
        </FormControl>
        <Button style={{backgroundColor:'rgb(12, 155, 121)'}} variant="contained" onClick={handleSubmit}>Log In</Button>
        <p style={{textAlign:'center',textDecoration:'none'}}>Not registered?<a href="" onClick={()=>navigate('/register')}  style={{textDecoration:'none'}}>Sign up</a></p>
    </Box>
    </Container>
        </div>
      
    </>
  );
}
