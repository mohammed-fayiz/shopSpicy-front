import { Container } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
const url=import.meta.env.VITE_BASE_URL

import Button from '@mui/material/Button';

const iframes=[
    <iframe style={{width:'100%',height:'250px'}} src="https://www.youtube.com/embed/K2oD9emq_pY?si=OIEf98lgChfJlvBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>,
    <iframe style={{width:'100%',height:'250px'}} src="https://www.youtube.com/embed/vzGa9Wi-KwM?si=TvqtBXU7CxKSu0Sl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>,
    <iframe style={{width:'100%',height:'250px'}} src="https://www.youtube.com/embed/K2oD9emq_pY?si=OIEf98lgChfJlvBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>,
    <iframe style={{width:'100%',height:'250px'}} src="https://www.youtube.com/embed/vzGa9Wi-KwM?si=TvqtBXU7CxKSu0Sl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>,
]

export default function FarmVideos() {

    const [record,setRecord]=React.useState([])

    React.useEffect(()=>{
        try {
            axios.get(`${url}/user/getvideo`)
            .then((res)=>{
                const response=res.data
                setRecord(response)
                
            })

        } catch (error) {
            console.log(error)
        }
    },[])
    console.log(record)
  return (
   <Container style={{paddingBottom:'80px'}}>
        <div className="grid-container">
            {
                record.map((video)=>
                    <div className="grid-box" style={{padding:'0px'}} key={video._id}>
                       <iframe style={{width:'100%',height:'250px'}} src={`https://www.youtube.com/embed/${video.ytlink}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                )
            }
            
        </div>
   </Container>
  );
}
