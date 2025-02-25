

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
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import axios from 'axios';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';
import FarmNotes from './farmerNotes';
import FarmVideos from './farmerVideos';
import { Hidden } from '@mui/material';
const url=import.meta.env.VITE_BASE_URL

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function FarmerService() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [record,setRecord]=React.useState({})
  const navigate=useNavigate()
  const [value, setValue] = React.useState(0);
  const [visible,setVisible]=React.useState('notes')
  const [orderData,setOrderData]=React.useState({})

  React.useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const decodetoken=jwtDecode(token)
    setRecord(decodetoken.data)
    try {
          axios.get(`${url}/user/getorderdetails`,{headers:{userid:decodetoken.data._id}})
          .then((res)=>setOrderData(res.data))
        } catch (error) {
          console.log(error)
        }
  },[])
  console.log('hthj',orderData)

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
                <MenuItem  onClick={()=>{navigate('/user/farmer')}}>
                  <Typography sx={{ textAlign: 'center' }} >Home</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate('/user/farmer/service')}>
                  <Typography sx={{ textAlign: 'center' }}>Services</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate('/user/farmer/products')}>
                  <Typography sx={{ textAlign: 'center' }}>Products</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate('/user/farmer/cart')}>
                  <Typography sx={{ textAlign: 'center' }}>Cart</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/user/farmer"
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
                onClick={()=>navigate('/user/farmer')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Home"}
              </Button>
              <Button
                onClick={()=>navigate('/user/farmer/service')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"services"}
              </Button>
              <Button
                onClick={()=>navigate('/user/farmer/products')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"products"}
              </Button>
              
              <Button
                onClick={()=>navigate('/user/farmer/Cart')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Cart"}
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
                <MenuItem  onClick={()=>navigate('/user/farmer/orders')}>
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
  <Box sx={{ width: 500 }}
        style={{margin:'auto',width:'100%',marginTop:'10px',marginBottom:'20px'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction  label="Notes"  onClick={()=>{setVisible('notes')}}  />
        <BottomNavigationAction label="Video's" onClick={()=>{setVisible('videos')}} />
      </BottomNavigation>
    </Box>
    <Container>
        {/* <span  style={visible=='notes'?{visibility:"visible",marginTop:'0px'}:{visibility:'hidden'}}>
            <FarmNotes />
            <FarmVideos/>
        </span> */}
        {
            visible=="notes"?<FarmNotes/>:<FarmVideos/>
        }
        

        
        
    </Container>
    </>
  );
}
