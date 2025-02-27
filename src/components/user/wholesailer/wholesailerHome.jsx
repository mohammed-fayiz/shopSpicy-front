import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function WholesailerHome() {
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
                <MenuItem  onClick={()=>navigate('/user/wholesailer/wholeDashboard')}>
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
            
              <div className='whole-home'>
                  <div className='whole-home-section' onClick={()=>navigate('/user/wholesailer/wholebuy')}>
                      
                      <h1 style={{color:'rgb(12, 155, 121)'}}>Buy</h1>
                      <h1 style={{color:'#794028',fontWeight:'1000'}}>Coffee</h1>
                    <div className="mask">
                      <img  src="https://png.pngtree.com/background/20230411/original/pngtree-coffee-drink-hot-drink-coffee-beans-picture-image_2392505.jpg" alt="" />
                  </div>
                  
                </div>
                  <div className=' whole-home-section' onClick={()=>navigate('/user/wholesailer/addproduct')}>
                    
                    <div className="mask2">
                      <img src="https://th.bing.com/th/id/OIP.OsgEz3CVwrLNAMqBMmFNAAHaEK?rs=1&pid=ImgDetMain" alt="" />
                      <h1 style={{color:'rgb(12, 155, 121)'}}>Sell Your</h1>
                      <h1 style={{color:'#794028',fontWeight:'1000'}}>Products</h1>
                  </div>
                  </div>
              </div>
            
      </Container>
    </>
  );
}
export default WholesailerHome;