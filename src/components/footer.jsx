import CopyrightIcon from '@mui/icons-material/Copyright';

const mystyle={
    marginTop:'30px',
    backgroundColor:'rgb(49, 158, 105)',
    color:'white',
    display:'flex',
    justifyContent:'center',
    alighnItems:'center',
    position:'relative',
    bottom:'0px',
    width:'100%',
    paddingTop:'20px',
    paddingBottom:'20px',
    gap:'10px',
    marginBottom:'0px',
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