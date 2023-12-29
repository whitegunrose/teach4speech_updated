import React from 'react';
import './InstructorDashboard.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function InstructorDashboard() {
  const gameDictList = [
    {"title": "Game 1", "description": "This is a game", "img": "https://researchparent.com/wp-content/uploads/Generic-Game-Board-Facebook.jpg"},
    {"title": "Game 2", "description": "This is a game 2", "img": "https://opengameart.org/sites/default/files/generic_platformer_mockup.png"},
  ];

  const navigate = useNavigate();
  const randomCode5 = Math.floor(Math.random() * 90000) + 10000;

  return (
    <div className='instructor-dashboard'>
      <Typography variant="h3">Instructor Dashboard</Typography>
      <br />
      <div className='dashboard-games'>
        {gameDictList.map((gameDict, index) => (
          <div key={index} className='dashboard-game' onClick={()=>{
            navigate(`/game-host/${randomCode5}`);
          }}>
            <img src={gameDict.img} alt="Game" />
            <Typography variant="h5">{gameDict.title}</Typography>
            <Typography variant="h6">{gameDict.description}</Typography>
          </div>
        ))}
      </div> 
    </div>
  );
}

export default InstructorDashboard;
