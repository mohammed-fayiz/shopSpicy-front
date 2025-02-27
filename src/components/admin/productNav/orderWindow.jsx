
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import {Container,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material';
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

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function AllProducts() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [record,setRecord]=React.useState([])
  const [editData,setEdit]=React.useState({})
  const [editProdId,setEditProdId]=React.useState('')
  const [divShow,setDivShow]=React.useState('')
  const refElement=React.useRef()
  const [filtering,setFilter]=React.useState('all')

    const navigate=useNavigate()

    
    React.useEffect(()=>{
        try {
            axios.get(`${url}/admin/getproducts`)
            .then((res)=>{
                const products=res.data
                setRecord(products)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    // console.log(record)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEditChange=(e)=>{
    setEdit({...editData,[e.target.name]:e.target.value})
  }

  const openEditForm=(prodId)=>{
    try {
      setDivShow('edit')
      record.map((item)=>{
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
      axios.put(`${url}/admin/adminprodupdate`,{data:{editProdId,editData}})
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

  return (
    <Box sx={{ display: 'flex' }} style={{paddingBottom:'80px'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:'rgb(12, 155, 121)'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{display:'flex',gap:'20px'}}>
            <h4 style={{fontStyle:'italic'}}>shopSpicy</h4> <p>Admin{' > '}Product{' > '}farmer</p>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['Home','userslist',  'Products', 'Drafts'].map((text, index) => ( */}
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>navigate(`/admin/product`)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                 <ArrowBackIcon /> 
                </ListItemIcon>
                <ListItemText
                  primary={'Back'}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
              <ListItemButton
              onClick={()=>navigate(`/admin/product/farmer/service`)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                 <MoreVertIcon /> 
                </ListItemIcon>
                <ListItemText
                  primary={'Services'}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          {/* ))} */}
        </List>
        <Divider />
      </Drawer>
      
      
      <Container>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <FormControl style={{width:'150px'}}>
            <InputLabel id="demo-simple-select-label" >Filter</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='userType'
            label="Filter"
            value={MenuItem.value}
            >
            <MenuItem value={'All'}><Button onClick={()=>{
                window.location.reload()
            }}>all</Button></MenuItem>
            <MenuItem value={'Farmer'}><Button onClick={()=>{
                const filtered=record.filter(item=>item.userType=='farmer')
                setRecord(filtered)
            }}>farmer</Button></MenuItem>
            <MenuItem value={'Wholesailer'}><Button onClick={()=>{
                const filtered=record.filter(item=>item.userType=='wholsailer')
                setRecord(filtered)
            }}>wholsailer</Button></MenuItem>
        </Select>
        </FormControl>
        <div style={divShow=='edit'?{display:'flex',padding:'0px'}:{display:'none'}}>
        <Container>
              <Box    >
                <form action="" className="form-box" ref={refElement}>
                 <div style={{display:'flex',justifyContent:'space-between'}}> <h3 style={{color:'rgb(6, 112, 75)'}}>Edit Product</h3><Button style={{color:'rgb(142, 139, 139)'}} onClick={()=>{setDivShow('')}}><CloseIcon/></Button></div>
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
      </Box>
      <div className='admin-whole-main' style={{marginLeft:" 0px"}}>
        <Box sx={{ flexGrow: 1 }}  marginTop={'20px'}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {record.map((prod) => (
              <Grid item xs={2} sm={4} md={4} key={prod._id}>
                      <div className="grid-box">
                        <h4 style={{textTransform:'uppercase'}}>{prod.prodname}</h4>
                        <img src={prod.imagelink} alt="" style={{border:'2px solid rgb(236, 227, 227)'}} />
                        <p><em>MRP : {prod.mrp} Rs</em></p>
                        <p>Stock Available : {prod.quantity}  nos.</p>
                        <div style={{border:'3px solid rgb(201, 199, 199)',display:'flex',margin:'auto',alignItems:'center',justifyContent:'center',width:'160px',borderRadius:'30px'}}>
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
    </Box>
  );
}
