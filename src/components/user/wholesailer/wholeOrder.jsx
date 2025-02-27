import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const url=import.meta.env.VITE_BASE_URL

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
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function WholeOrder() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()
  const [record,setRecord]=React.useState({})
  const [orderData,setOrderData]=React.useState([])
  const [seller,setSeller]=React.useState('')
  
  const famrerIn=sessionStorage.getItem("farmer")

  React.useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const decodeToken=jwtDecode(token)
    setRecord(decodeToken.data)
    
    
    try {
      axios.get(`${url}/user/getorderdetailswhole`)
      .then((res)=>{
        setOrderData(res.data) 
    })
    } catch (error) {
      console.log(error)
    }
  },[])
  console.log(orderData,famrerIn,seller)

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <AppBar position="static" style={{backgroundColor:'rgb(12, 155, 121)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/user/wholesailer"
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
                <MenuItem  onClick={()=>navigate('/user/wholesailer')}>
                  <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                </MenuItem>
                {/* <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Services</Typography>
                </MenuItem> */}
                <MenuItem  onClick={()=>navigate('/user/wholesailer/wholedashboard')}>
                  <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate('/user/wholesailer/wholebuy')}>
                  <Typography sx={{ textAlign: 'center' }}>Buy</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate('/user/wholesailer/addproduct')}>
                  <Typography sx={{ textAlign: 'center' }}>Add Product</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/user/wholesailer"
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
                onClick={()=>navigate('/user/wholesailer')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Home"}
              </Button>
              {/* <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"services"}
              </Button> */}
              <Button
                onClick={()=>navigate('/user/wholesailer/wholedashboard')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Dashboard"}
              </Button>
              <Button
                onClick={()=>navigate('/user/wholesailer/wholebuy')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"buy"}
              </Button>
              <Button
                onClick={()=>navigate('/user/wholesailer/addproduct')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Add Product"}
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
                <MenuItem  onClick={()=>{navigate('/user/wholesailer/wholeorder')}}>
                  <Typography sx={{ textAlign: 'center' }}>orders</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{
                    navigate('/')
                    sessionStorage.clear()
                    }}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{
                    axios.post(`${url}/user/deleteaccount`,{data:{userId:record._id}})
                    navigate('/')
                    sessionStorage.clear()
                    }}>
                  <Typography sx={{ textAlign: 'center' }}>Delete</Typography>
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
           <div style={{display:'flex',gap:"10px"}}>
           <h4>{record.username}</h4><p style={{color:'rgb(12, 155, 121)'}}>  [ {record.userType} ]</p>
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
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
      <Container style={{paddingBottom:'80px'}}>
      <Box sx={{ flexGrow: 1 }} marginTop={'20px'}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <div className="grid-box" style={{marginTop:'50px'}} >
            {orderData.filter(user=>user.userId.userType=='wholsailer' && user.productId!=null).map((order) => (
            <Grid item xs={2} sm={4} md={4} key={order._id}>
                    <div className='whole-order-box' style={{width:'300px'}}>
                      <p>product : <strong>{order.productId.prodname}</strong></p>
                      <p><em>MRP : <strong>{order.productId.mrp}</strong></em> Rs</p>
                      <p>ordered amount : <strong>{order.quantity}</strong> kg</p>
                      <p>total : <strong>{Number(order.productId.mrp*order.quantity)}</strong></p><br />
                     
                    </div>
            </Grid>
          ))}

           
            <div className='whole-order-box' >
            <h4>Pikup Details</h4><br /><hr /><br />
            { 
               orderData.filter(user=>user._id==famrerIn).map((order) => 
                <>
                  <p>Farmer name : <strong>{order.userId.username}</strong></p>
                  <p>mobile : <strong>{order.userId.mobile}</strong></p>
                </>
                )
              }
            {orderData.filter(user=>user.userId.userType=='wholsailer' && user.productId!=null).map((order) => 
              <>
                
                    <p>landmark : <strong>{order.landmark}</strong></p>
                    <p>pincode : <strong>{order.pincode}</strong></p>
                    <p>city : <strong>{order.city}</strong></p>
                    <p>state : <strong>{order.state}</strong></p>
              </>
            )}
             
            </div>
            
          </div>
        </Grid>
      </Box>
      </Container>
    </>
  );
}
export default WholeOrder;