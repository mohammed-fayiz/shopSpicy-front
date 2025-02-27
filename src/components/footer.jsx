import CopyrightIcon from '@mui/icons-material/Copyright';

const mystyle={
    backgroundColor:'rgb(49, 158, 105)',
    color:'white',
    display:'flex',
    justifyContent:'center',
    alighnItems:'center',
    position:'fixed',
    bottom:'0px',
    width:'100%',
    paddingTop:'20px',
    paddingBottom:'20px',
    gap:'10px',
    marginTop:'100px',
    
}

export default function Footer(){

    return(
        <>
            <div style={mystyle}>
                <CopyrightIcon/><p>All Rights Reserved</p>
            </div>
        </>
    )
}