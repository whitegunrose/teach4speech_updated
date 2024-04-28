import { Box, Container, Typography} from "@mui/material";
import About from "../LandingPage/About";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
function LandingPage() {

  const yPos = useState(0)

  useEffect(()=>{
      const handleScroll = () => {
          yPos[1](window.scrollY)
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  })

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",                     
        justifyContent: "center",
        alignItems: "center",                
        overflow: "hidden",
        textAlign: "center",
        width: "100vw",
        margin: 0,
        padding: 0,

      }}
    >
      <div id="home"></div>
      <Navbar/>

      <ScrollDown yPos={yPos[0].valueOf()}/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",                              
          maxWidth: "100%",
          minHeight: "100vh",
          justifyContent: "center",
          width: "100%",
          background: "linear-gradient(180deg, white, white,  #CBC3E3)",
        }}
      >
        
        <Typography variant="h1">Teach4Speech</Typography>
        <Typography variant="h2">                   
          Interactive speech education
        </Typography>

      </Box>
      <About/>
    </Box>
  );
}

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function ScrollDown({yPos} = {yPos: 0}){
  return (
    <Container
      sx={{
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '2vh',
        opacity: `clamp(0, 1, ${1 - yPos/500})`,
      }}
    >
    <Typography variant="caption" sx={{
      color: 'black',
      fontSize: 'clamp(12px, 2vw, 24px)',
      fontWeight: 'bold',
    }}>Scroll down</Typography>
    <KeyboardDoubleArrowDownIcon sx={{

      fontSize: 'clamp(24px, 3vw, 48px)',
      color: 'black',
      '@keyframes bounce': {
        '0%': {transform: 'translateXY(0)'},
        '50%': {transform: 'translateY(10px)'},
        '100%': {transform: 'translateY(0)'}
      },
      animation: 'bounce 1s infinite',
    }}/>
    </Container>
  )
}


export default LandingPage;