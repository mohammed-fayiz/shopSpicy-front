import { Container } from '@mui/material';
import axios from 'axios';
import * as React from 'react';

import Button from '@mui/material/Button';


import { styled, useTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { jwtDecode } from 'jwt-decode';
import { data } from 'react-router-dom';

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

export default function FarmProdBuy() {

    const [record,setRecord]=React.useState([])

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

    const addToCart=(productId,quantity)=>{
      try {
        const token=sessionStorage.getItem("token")
        const decodeToken=jwtDecode(token)
        const userId=decodeToken.data._id
        axios.post(`${url}/user/farmeraddtocart`,{data:{userId,productId,quantity}})
        .then((res)=>{
          alert(res.data.msg)
        })
        .catch((res)=>{
          console.log(res)
          alert("error adding to cart")
        })
      } catch (error) {
        console.log(error)
      }
    }

  return (
   <Container>
        <div className="grid-container">
        {
                record.filter((it)=>it.userType=="farmer"&&it.prodname!="coffee").map((item)=>(
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
                    <Button variant='contained' style={{backgroundColor:'rgb(12, 155, 121)'}} onClick={()=>{addToCart(item._id,1)}}>Add to cart</Button>
                  </div>
                ))
              }
            
        </div>
        
        
   </Container>
  );
}
