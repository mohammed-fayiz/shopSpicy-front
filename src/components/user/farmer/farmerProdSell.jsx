import { Container } from '@mui/material';
import axios from 'axios';
import * as React from 'react';

import Button from '@mui/material/Button';

import { styled, useTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jwtDecode } from 'jwt-decode';
import Alert from '@mui/material/Alert';
const url=import.meta.env.VITE_BASE_URL

  
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

export default function FarmProdSell() {

    const [record,setRecord]=React.useState([])
    const [orderData,setOrderData]=React.useState({})
    const [orderStatus,setStatus]=React.useState('')

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleData=(e)=>{
    setOrderData({...orderData,[e.target.name]:e.target.value})
  }
  const handleSellSubmit=(e)=>{
    e.preventDefault()
    try {
        const token=sessionStorage.getItem('token')
        const decodetoken=jwtDecode(token)
        const userId=decodetoken.data._id
        const product=record.filter((it)=>it.prodname=="coffee")
        const productId=product[0]._id
        axios.post(`${url}/user/farmersellorder`,{data:{userId,productId,orderData}})
        .then((res)=>{
            alert(res.data.msg)
        })
    } catch (error) {
        console.log(error)
    }
  }

    React.useEffect(()=>{
        try {
            axios.get(`${url}/user/getprodsell`)
            .then((res)=>{
                const response=res.data
                setRecord(response)
                
            })

        } catch (error) {
            console.log(error)
        }
    },[])
    console.log(record)
  return (
   <Container style={{paddingBottom:'80px'}}>
        <div className="grid-container">
        {
                record.filter((it)=>it.userType=="farmer"&&it.prodname=="coffee").map((item)=>(
                  <div className="grid-box" key={item._id}>
                    <h4>{item.prodname}</h4>
                    <img src={item.imagelink} alt="" />
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                    <p><em>MRP : {item.mrp}</em></p>
                    <HtmlTooltip
                      title={
                      <React.Fragment>
                          {item.desc}
                      </React.Fragment>
                      }
                  >
                      <Button style={{marginLeft:'0px'}}><InfoIcon/></Button>
                  </HtmlTooltip>
                    </div>
                    <Button variant='contained' style={{backgroundColor:'rgb(245, 101, 101)'}} onClick={handleClickOpen}>Sell</Button>
                  </div>
                ))
              }
              <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                    },
                },
                }}
            >
                <DialogTitle>Sell your Beans</DialogTitle>
                <DialogContent>
                <DialogContentText>Product : Coffee</DialogContentText>
                <TextField fullWidth id="outlined-basic" name='quantity' label="Quantity in Kg" variant="outlined"  onChange={handleData}/>
                <DialogContentText>Location Info*</DialogContentText>
                <TextField required margin="dense" id="name" name="landmark" label="Landmark" type="text" fullWidth variant="outlined" onChange={handleData}/>
                <TextField required margin="dense" id="name" name="pincode" label="PIN code" type="text" fullWidth variant="outlined" onChange={handleData}/>
                <TextField required margin="dense" id="name" name="city" label="City" type="text" fullWidth variant="outlined" onChange={handleData}/>
                <TextField required margin="dense" id="name" name="state" label="State" type="text" fullWidth variant="outlined" onChange={handleData}/>

                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleSellSubmit}>Sell</Button>
                </DialogActions>
            </Dialog>
            
        </div>
   </Container>
  );
}
