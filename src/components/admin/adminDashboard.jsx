
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
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
const url=import.meta.env.VITE_BASE_URL


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

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [record1,setRecord1]=React.useState([])
  const [record2,setRecord2]=React.useState([])
  const [record3,setRecord3]=React.useState([])

    let [countUsers,setUsers]=React.useState(0)
    let [countProducts,setProducts]=React.useState(0)
    let [countOrders,setOrders]=React.useState(0)
    const navigate=useNavigate()

    function counterUsers(item){
        if(item!="admin"){
            countUsers++
        }
    }
    record1.filter((it)=>counterUsers(it.userType))

    function counterProducts(item){
      if(item!="admin"){
          countProducts++
      }
      return countProducts
  }
  record2.filter((it)=>counterProducts(it.userType))


  function counterOrders(item){
    if(item!="admin"){
        countOrders++
    }
    return countOrders
}
record3.filter((it)=>counterOrders(it.userType))
    
    React.useEffect(()=>{
        try {
            axios.get(`${url}/admin/userlist`)
            .then((res)=>{
                const users=res.data
                setRecord1(users)
            })
            axios.get(`${url}/admin/getproducts`)
            .then((res)=>{
                const products=res.data
                setRecord2(products)
            })
            axios.get(`${url}/admin/orderlist`)
            .then((res)=>{
                const orders=res.data
                setRecord3(orders)
            })
        } catch (error) {
            console.log(error)
        }
    },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
            <h4 style={{fontStyle:'italic'}}>shopSpicy</h4> <p>Admin{' > '}Dashboard</p>
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
              onClick={()=>navigate(`/admin/dashboard`)}
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
                 <HomeIcon /> 
                </ListItemIcon>
                <ListItemText
                  primary={'Dashboard'}
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
              onClick={()=>navigate(`/admin/Userslist`)}
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
                 <AccountCircleIcon /> 
                </ListItemIcon>
                <ListItemText
                  primary={'User List'}
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
                 <InventoryIcon /> 
                </ListItemIcon>
                <ListItemText
                  primary={'Product'}
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
              onClick={()=>navigate(`/admin/orderlist`)}
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
                 <ProductionQuantityLimitsIcon/> 
                </ListItemIcon>
                <ListItemText
                  primary={'Orders'}
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
            <div style={{display:'flex',gap:'20px'}}>
            <div className="user-div" style={{backgroundColor:'white',color:'rgb(12, 155, 121)',border:'3px solid rgb(12, 155, 121)'}} onClick={()=>{navigate("/admin/usersList")}}>
                <p style={{textAlign:'left',fontSize:'30px',fontWeight:'700'}}>Total <br /> Users  </p>
                <h1 style={{textAlign:'right',fontSize:'100px',fontWeight:'800'}}>: {countUsers}</h1>
            </div>
            <div className="user-div" style={{backgroundColor:'white',color:'rgb(12, 155, 121)',border:'3px solid rgb(12, 155, 121)'}} onClick={()=>{navigate("/admin/allproducts")}}>
                <p style={{textAlign:'left',fontSize:'30px',fontWeight:'700'}}>Total <br /> Products  </p>
                <h1 style={{textAlign:'right',fontSize:'100px',fontWeight:'800'}}>: {countProducts}</h1>
            </div>
            <div className="user-div" style={{backgroundColor:'white',color:'rgb(12, 155, 121)',border:'3px solid rgb(12, 155, 121)'}} onClick={()=>{navigate("/admin/orderList")}}>
                <p style={{textAlign:'left',fontSize:'30px',fontWeight:'700'}}>Total <br /> Orders  </p>
                <h1 style={{textAlign:'right',fontSize:'100px',fontWeight:'800'}}>: {countOrders}</h1>
            </div>
            </div>
      </Box>
    </Box>
  );
}