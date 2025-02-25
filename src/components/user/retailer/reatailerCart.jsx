import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';

import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { TextField } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const url=import.meta.env.VITE_BASE_URL

// const url=import .meta.env.back_url

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function RetailerCart() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [record,setRecord]=React.useState({})
  const [cartData,setCartData]=React.useState([])
  const [orderData,setOrderData]=React.useState({})
  const navigate=useNavigate()
  const [navStat,setNav]=React.useState('')
  const [location,setLocation]=React.useState({})
  const [cartId,setCartId]=React.useState('')

  React.useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const decodetoken=jwtDecode(token)
    setRecord(decodetoken.data)
    const userid=decodetoken.data._id

    try {
        axios.get(`${url}/user/farmerviewcart`,{headers:{userid:userid}})
        .then((res)=>{
            setCartData(res.data.items)
            setCartId(res.data._id)
        } 
    )
    } catch (error) {
        console.log(error)
    }
  },[])
//   console.log(record._id)

  console.log(cartData._id,'retg')
  const handleBuySubmit=(e)=>{
    e.preventDefault()
    try {
        const userId=record._id
        axios.post(`${url}/user/farmerbuyorder`,{data:{userId,cartId,location}})
        .then((res)=>{
            alert(res.data.msg)
        })
        .catch((res)=>alert("error placing"))
    } catch (error) {
        console.log(error)
    }
  }

  const RemoveCart=(cartId,productId)=>{
    try {
        const token=sessionStorage.getItem("token")
        const decodetoken=jwtDecode(token)
        setRecord(decodetoken.data)
        const userId=decodetoken.data._id
        console.log(cartId,productId)
        axios.delete(`${url}/user/removecart`,{data:{userId,cartId,productId}})
        .then((res)=>{
            alert(res.data.msg)
            window.location.reload()
        })
        .catch((res)=>alert("error removed"))
    } catch (error) {
        console.log(error)
    }
  }
  

  const handleLocData=(e)=>{
    setLocation({...location,[e.target.name]:e.target.value})
  }

  const totalPrice=cartData.reduce((total,item)=>{ return total+Number(item.productId.mrp*item.quantity)},0);
  console.log(cartId)


   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="static" style={{backgroundColor:'rgb(12, 155, 121)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/user/farmer"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <h4 style={{fontStyle:'italic',fontSize:'35px'}}>shopSpicy</h4> 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <MenuItem  onClick={()=>navigate('/user/retailer')}>
                  <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate("/user/retailer/products")}>
                  <Typography sx={{ textAlign: 'center' }}>Products</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/user/retailer"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <h4 style={{fontStyle:'italic',fontSize:'35px'}}>shopSpicy</h4> 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              <Button
                onClick={()=>navigate('/user/retailer')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Home"}
              </Button>
              <Button
                onClick={()=>navigate("/user/retailer/products")}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Dashboard"}
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleClickOpen}>
                  <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate('/user/retailer/order')}>
                  <Typography sx={{ textAlign: 'center' }}>Orders</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{
                    navigate('/')
                    sessionStorage.clear()
                    }}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <React.Fragment>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <div style={{display:'flex',gap:'10px'}}>
        <p style={{color:'rgb(12, 155, 121)'}}>[ {record.userType} ]</p>
        {record.username}
        </div>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
      <Typography gutterBottom>
          {/* <p style={{display:'flex'}}>Order Status : <p style={orderData.orderstatus=='pending'?{width:'75px',textAlign:'center',backgroundColor:'yellow'}:{width:'75px',textAlign:'center',backgroundColor:'green'}}>{orderData.orderstatus}</p></p> */}
        </Typography>
        <Typography gutterBottom>
        {/* <p style={{display:'flex'}}>Wallet Balance : <p>{orderData.productId.prodname=="coffee"?Number(orderData.quantity)*Number(orderData.productId.mrp):'0'} Rs</p></p> */}

        </Typography>
      </DialogContent>
      <DialogActions>
        {/* <Button autoFocus onClick={handleClose}>
          Save changes
        </Button> */}
      </DialogActions>
    </BootstrapDialog>
  </React.Fragment>
    <Container>
        <div className="cart-home">
            <div className="cart-home-left">
                <div className="cart-container">
                {
                    cartData.map((it)=>
                        <div className="cart-box" key={it._id}>
                            <img src={it.productId.imagelink} alt="" />
                            <h3>{it.productId.prodname}</h3>
                            <p>price: {it.productId.mrp} Rs</p>
                            <p>Quantity: {it.quantity}</p>
                            <Button style={{color:'rgb(244, 128, 128)'}} onClick={()=>RemoveCart(it._id,it.productId._id)}><DeleteOutlinedIcon/></Button>
                        </div>
                    )
                }
                </div>
            </div>
            <div className="cart-home-right">
                <div className="cart-order-container">
                <div className="order-header">
                    <h1>order summary: </h1><br />
                </div>
                    {
                        cartData.map((it)=>
                            <div className="cart-order-box" key={it._id}>
                                <p>{it.productId.prodname}: {it.quantity} x {it.productId.mrp} : {Number(it.quantity)*Number(it.productId.mrp)} Rs </p>
                                
                            </div>
                        )
                    }
                    <hr />
                    <p>Total Price : {totalPrice} Rs</p>
                    <Button style={{width:'150px',backgroundColor:'rgb(9, 205, 110)'}} onClick={()=>setNav("place")}>Place Order</Button>
                </div>
                
                
            </div>
        </div>
        <div className="popup-form" style={navStat=='place'?{display:'flex',flexDirection:'column'}:{display:'none'}}>

                <TextField required margin="dense" id="name" name="landmark" label="Landmark" type="text" fullWidth variant="outlined" onChange={handleLocData}/>
                <TextField required margin="dense" id="name" name="pincode" label="PIN code" type="text" fullWidth variant="outlined" onChange={handleLocData}/>
                <TextField required margin="dense" id="name" name="city" label="City" type="text" fullWidth variant="outlined" onChange={handleLocData}/>
                <TextField required margin="dense" id="name" name="state" label="State" type="text" fullWidth variant="outlined" onChange={handleLocData}/>
                <div style={{gap:'10px',display:'flex'}}>
                    <Button variant='outlined' style={{borderColor:'red',color:'red'}} onClick={()=>{setNav('')}}>Close</Button>
                    <Button variant='contained' style={{backgroundColor:'green',color:'white'}} onClick={handleBuySubmit}>Order</Button>
                </div>
        </div>
    </Container>
    </>
  );
}
export default RetailerCart;