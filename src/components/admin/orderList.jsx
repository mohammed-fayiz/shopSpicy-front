
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
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material';
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

export default function OrderList() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [record,setRecord]=React.useState([])
  const [cartData,setCartData]=React.useState([])
    let [count,setUsers]=React.useState(0)
    const navigate=useNavigate()

    function counter(item){
        if(item!="admin"){
            count++
        }
        return count
    }
    record.filter((it)=>counter(it.userType))
    console.log('rec',record)
    
    React.useEffect(()=>{
        try {
            axios.get(`${url}/admin/orderlist`)
            .then((res)=>{
                const users=res.data
                setRecord(users)
            })
            axios.get(`${url}/admin/cartlist`)
            .then((res)=>{
              const cart=res.data
              setCartData(cart)
          })
        } catch (error) {
            console.log(error)
        }
    },[])
    console.log(cartData)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const confrimOrder=(orderid)=>{
    try {
      console.log('gfhj',orderid)
      axios.post(`${url}/admin/confirmorder`,{data:{orderid:orderid}})
      .then((res)=>{
        alert(res.data)
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
    }
  }

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
            <h4 style={{fontStyle:'italic'}}>shopSpicy</h4> <p>Admin{' > '}Order's</p>
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
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
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
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <FormControl style={{width:'150px',marginBottom:'10px'}}>
            <InputLabel id="demo-simple-select-label" >Filter</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='userType'
            label="Filter"
            value={MenuItem.value}
            >
            <MenuItem value={'All'}><Button onClick={()=>{
                const filtered=record.filter(item=>item.userId.userType=='farmer'&&item.userId.userType=='wholsailer')
                setRecord(filtered)
                window.location.reload()
            }}>all</Button></MenuItem>
            <MenuItem value={'Farmer'}><Button onClick={()=>{
                const filtered=record.filter(item=>item.userId.userType=='farmer')
                setRecord(filtered)
            }}>farmer</Button></MenuItem>
            <MenuItem value={'Wholesailer'}><Button onClick={()=>{
                const filtered=record.filter(item=>item.userId.userType=='wholsailer')
                setRecord(filtered)
            }}>wholsailer</Button></MenuItem>
            <MenuItem value={'Retailer'}><Button onClick={()=>{
                const filtered=record.filter(item=>item.userId.userType=='retailer')
                setRecord(filtered)
            }}>retailer</Button></MenuItem>
        </Select>
        </FormControl>
            <div className="order-container">
                {
                    record.filter(order=>order.cartId==null).map((order)=>
                        <Box>
                            <div className="order-box" key={order._id}>
                                <div className="order-header">
                                    <h3>#ORDER-{record.indexOf(order)+1}</h3>
                                </div>
                                <table>
                                    <tr>
                                        <th>User Name </th><td>:</td><td>{order.userId.username}</td>

                                    </tr>
                                    <tr>
                                        <th>User Type </th><td>:</td><td style={{color:"rgb(12, 155, 121)"}}>{order.userId.userType}{order.userId.userType=="farmer"?" [sale]":" [Buy]"}</td>
                                    </tr>
                                    <tr>
                                        <th>Product </th><td>:</td><td >{order.productId.prodname}</td>
                                    </tr>
                                    <tr>
                                        <th>Quantity </th><td>:</td><td>{order.quantity} </td>
                                    </tr>
                                    <tr>
                                        <th>Total Price </th><td>:</td><td>{Number(order.quantity*order.productId.mrp)}₹</td>
                                        
                                    </tr>
                                    <tr>
                                      <th>Order Status</th><td>:</td><td style={{display:'flex'}}>{order.orderstatus} <DoneIcon style={order.orderstatus=="pending"?{display:'none'}:{display:'flex',color:'green'}}/>< Button onClick={()=>confrimOrder(order._id)}>confirm</Button></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <th colSpan={3}>Pick Up Location</th>
                                    </tr>
                                    <tr>
                                        <td>Landmark </td><td>:</td><td>{order.landmark} </td>
                                    </tr>
                                    <tr>
                                        <td>PIN code </td><td>:</td><td>{order.pincode} </td>
                                    </tr>
                                    <tr>
                                        <td>City </td><td>:</td><td>{order.city} </td>
                                    </tr>
                                    <tr>
                                        <td>State </td><td>:</td><td>{order.state} </td>
                                    </tr>
                                </table>
                        </div>
                        </Box>
                    )
                }
                {
                    record.filter(order=>order.cartId!=null).map((order)=>
                        <Box>
                            <div className="order-box" style={{marginRight:'20px',marginLeft:'20px'}} key={order._id}>
                                <div className="order-header">
                                    <h3>#ORDER-{record.indexOf(order)+1}</h3>
                                </div>
                                <table>
                                    <tr>
                                        <th>User Name </th><td>:</td><td>{order.userId.username}</td>

                                    </tr>
                                    <tr>
                                        <th>User Type </th><td>:</td><td style={{color:"rgb(12, 155, 121)"}}>{order.userId.userType} [Buy]</td>
                                    </tr>
                                    <tr>
                                        <th>Products </th><td>:</td><td >
                                          {
                                            cartData.filter(cart=>cart._id==order.cartId).map((it)=>
                                            <div key={it._id}>
                                              <ul>{it.items.map(pro=>
                                                <li>{pro.productId.prodname} x {pro.quantity}</li>
                                              )}
                                              {/* {it.items.reduce((total,pro)=>
                                                <li>{total+=(return Number(pro.productId.mrp)*Number(pro.quantity))}</li>
                                              ,0)
                                              } */}
                                              </ul>
                                            </div>
                                            )
                                          }
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th>Total Price </th><td>:</td><td>
                                          
                                          </td>
                                    </tr>
                                    <tr>
                                        {/* <th>Total Price </th><td>:</td><td>{Number(order.quantity*order.productId.mrp)}₹</td> */}
                                    </tr>
                                    <tr>
                                      <th>Order Status</th><td>:</td><td style={{display:'flex'}}>{order.orderstatus}<DoneIcon style={order.orderstatus=="pending"?{display:'none'}:{display:'flex',color:'green'}}/>< Button onClick={()=>confrimOrder(order._id)}>confirm</Button></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <th colSpan={3}>Delivery Location</th>
                                    </tr>
                                    <tr>
                                        <td>Landmark </td><td>:</td><td>{order.landmark} </td>
                                    </tr>
                                    <tr>
                                        <td>PIN code </td><td>:</td><td>{order.pincode} </td>
                                    </tr>
                                    <tr>
                                        <td>City </td><td>:</td><td>{order.city} </td>
                                    </tr>
                                    <tr>
                                        <td>State </td><td>:</td><td>{order.state} </td>
                                    </tr>
                                </table>
                        </div>
                        </Box>
                    )
                }
            </div>
      </Box>
    </Box>
  );
}