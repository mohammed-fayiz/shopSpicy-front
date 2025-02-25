
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


import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const url=import.meta.env.VITE_BASE_URL

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function RetailerHome() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()
  const [record,setRecord]=React.useState({})

  React.useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const decodeToken=jwtDecode(token)
    setRecord(decodeToken.data)
    
  },[])
  console.log(record)

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
            href="/user/retailer"
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
                <MenuItem  onClick={()=>navigate('/user/retailer/products')}>
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
              {/* <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"services"}
              </Button> */}
              <Button
                onClick={()=>navigate('/user/retailer/products')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Products"}
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
                <MenuItem  onClick={()=>{navigate('/user/retailer/order')}}>
                  <Typography sx={{ textAlign: 'center' }}>orders</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{navigate('/user/retailer/cart')}}>
                  <Typography sx={{ textAlign: 'center' }}>cart</Typography>
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
      
              <Carousel 
              infiniteLoop={true}
              autoPlay={true} 
              stopOnHover={true}
              showThumbs={false}
              emulateTouch={true}
              useKeyboardArrows={true}
              showArrows={false}
              showIndicators={true}
              className='carousel-main-retailer'>
              <div className='carousel-style-retailer'>

                  <div >
                  <div className='carousel-float'>Browse Coffee Products.</div>
                  <img className='carousel-image' style={{height:'670px',width:'100%',objectFit:'fill'}}   width={600}  src="https://img.freepik.com/free-photo/delicious-organic-coffee-still-life_23-2151762341.jpg?t=st=1740396688~exp=1740400288~hmac=b09c4ca4cc678c1c25d0d8ce0f67f2b5ec07a45c4f37e9122e06ec1bf248e364&w=1800" alt="" />
                  </div>
              </div>
              <div className='carousel-style'>
                
              <div >
              <div className='carousel-float'>Buy Coffee Products.</div>
                  <img style={{height:'685px',overflow:'hidden'}}  src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711667.jpg?t=st=1740396776~exp=1740400376~hmac=f148bb0dcbbcac741ddcad7851797a7a33df096ff0c983013954444de959d7d9&w=1800" alt="" />
                  </div>
              </div>
              <div className='carousel-style'>
                
              <div>
              <div className='carousel-float'>Get Better Products.</div>
                  <img src="https://img.freepik.com/free-photo/spice-still-life-roasted-bean_1172-296.jpg?t=st=1740396915~exp=1740400515~hmac=106574c0646b8c26cdca74668f5d030bcd3a0d353ab2e65fc9671479880a3aa7&w=1380" alt="" />
                  </div>
              </div>
              
          </Carousel>
            
    </>
  );
}
export default RetailerHome;