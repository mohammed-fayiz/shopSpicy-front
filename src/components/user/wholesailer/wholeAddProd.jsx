import * as React from 'react';
import { useNavigate } from 'react-router-dom';

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
import Tooltip,{ tooltipClasses } from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function WholeAddProd() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()
  const [record,setRecord]=React.useState({})
  const [sendData,setSendData]=React.useState({})
  const [productData,setProducts]=React.useState([])
  const [editData,setEdit]=React.useState({})
  const [editProdId,setEditProdId]=React.useState('')
  const [divShow,setDivShow]=React.useState('')
  const refElement=React.useRef()


  React.useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const decodeToken=jwtDecode(token)
    setRecord(decodeToken.data)
    try {
      axios.get(`${url}/user/getwholeproduct`)
      .then((res)=>{
        setProducts(res.data)
      })
    } catch (error) {
      console.log(error)
    }
    
  },[])
  console.log(productData)

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

  const handleChange=(e)=>{
    setSendData({...sendData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    try {
      axios.post(`${url}/user/wholeaddproduct`,{data:{userType:record.userType,sendData}})
      .then((res)=>{
        alert(res.data)
        setDivShow('')
        window.location.reload()
      })
      
    } catch (error) {
      console.log(error)
    }
    
  }


  const handleEditChange=(e)=>{
    setEdit({...editData,[e.target.name]:e.target.value})
  }

  const openEditForm=(prodId)=>{
    try {
      setDivShow('edit')
      productData.map((item)=>{
        if(item._id==prodId){
          const edit=item
          const element=refElement.current
          element['prodname'].value=edit.prodname
          element['imagelink'].value=edit.imagelink
          element['desc'].value=edit.desc
          element['mrp'].value=edit.mrp
          element['quantity'].value=edit.quantity
          setEditProdId(prodId)
        }
      })
      
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleEditSubmit=(e)=>{
    e.preventDefault()
    try {
      axios.put(`${url}/user/wholeprodupdate`,{data:{editProdId,editData}})
      .then((res)=>{
        alert(res.data)
        setDivShow('')
        window.location.reload()
        
      })
    } catch (error) {
      alert("error updating")
      console.log(error)
    }
    
  }

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
         <Button variant="contained" onClick={()=>{setDivShow('show')}} endIcon={<AddIcon />} style={{backgroundColor:"rgb(12, 155, 121",marginTop:'20px'}}>
            Add Product
        </Button>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div style={divShow=='edit'?{display:'flex',padding:'0px'}:{display:'none'}}>
            <Container>
              <Box    >
                <form action="" className="form-box" ref={refElement}>
                  <h3 style={{color:'rgb(6, 112, 75)'}}>Edit Product</h3>
                  <TextField id="outlined-basic" name='prodname' label="Product Name" variant="outlined" onChange={handleEditChange}/>
                  <TextField id="outlined-basic" name='imagelink' label="Paste Image Link" variant="outlined" onChange={handleEditChange}/>
                  <TextField id="outlined-basic" name='desc' label="Description" variant="outlined" onChange={handleEditChange}/>
                  <TextField id="outlined-basic" name='mrp' label="MRP( per kg)" variant="outlined" onChange={handleEditChange}/>
                  <TextField id="outlined-basic" name='quantity' label="Quantity" type='number' variant="outlined" onChange={handleEditChange}/>
                  <Button style={{backgroundColor:'rgb(12, 155, 121)'}} variant="contained" onClick={handleEditSubmit}>Update</Button>
                  </form>
              </Box>
            </Container>
        </div>
        <div className='form-container' style={divShow=='show'?{display:'flex',padding:'0px'}:{display:'none'}}>
        <Container>
          <Box  className="form-box">
              <h3 style={{color:'rgb(6, 112, 75)'}}>Add Product</h3>
              <TextField id="outlined-basic" name='prodname' label="Product Name" variant="outlined" onChange={handleChange}/>
              <TextField id="outlined-basic" name='imagelink' label="Paste Image Link" variant="outlined" onChange={handleChange}/>
              <TextField id="outlined-basic" name='desc' label="Description" variant="outlined" onChange={handleChange}/>
              <TextField id="outlined-basic" name='mrp' label="MRP( per kg)" variant="outlined" onChange={handleChange}/>
              <TextField id="outlined-basic" name='quantity' label="Quantity" type='number' variant="outlined" onChange={handleChange}/>
              <Button style={{backgroundColor:'rgb(12, 155, 121)'}} variant="contained" onClick={handleSubmit}>Add</Button>
        </Box>
      </Container>
        </div>
      </Box>
      <div className="product-whole">
        <Box sx={{ flexGrow: 1 }} marginTop={'20px'}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            {productData.filter(item=>item.userType=='wholsailer').map((prod) => (
              <Grid item xs={2} sm={4} md={4} key={prod._id}>
                      <div className="grid-box">
                        <h4 style={{textTransform:'uppercase'}}>{prod.prodname}</h4>
                        <img src={prod.imagelink} alt="" style={{border:'2px solid rgb(236, 227, 227)'}} />
                        <p><em>MRP : {prod.mrp} Rs</em></p>
                        <p>Stock Available : {prod.quantity}  nos.</p>
                        <div  style={{border:'3px solid rgb(201, 199, 199)',display:'flex',margin:'auto',alignItems:'center',justifyContent:'center',width:'160px',borderRadius:'30px'}}>
                        <HtmlTooltip
                            title={
                            <React.Fragment>
                                {'Edit'}
                            </React.Fragment>
                            }
                            >
                            <Button style={{marginLeft:'0px',color:'rgb(8, 0, 0)'}} onClick={()=>{
                              
                              openEditForm(prod._id)
                              
                              }}><EditIcon/></Button>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                            <React.Fragment>
                                {'Delete'}
                            </React.Fragment>
                            }
                            >
                            <Button style={{marginLeft:'0px',color:'rgb(249, 123, 123)'}} onClick={()=>{
                              axios.delete(`${url}/user/wholedeleteproduct/${prod._id}`)
                              .then((res)=>{
                                alert(res.data)
                                window.location.reload()
                              })
                              .catch((err)=>alert('error deleting prod'))
                            }}><DeleteIcon/></Button>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                            <React.Fragment>
                                {prod.desc}
                            </React.Fragment>
                            }
                            >
                            <Button style={{marginLeft:'0px',color:'rgb(8, 151, 108)'}}><InfoIcon/></Button>
                        </HtmlTooltip>
                        </div>
                      </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      </Container>
    </>
  );
}
export default WholeAddProd;