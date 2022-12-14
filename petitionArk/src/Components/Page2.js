import React from 'react'
import logo from "./logo.jpeg"
import { useSearchParams } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
function Page2() {
  const ApiPoint = `https://localhost/ace`





  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPlayerTime, setSearchPlayerTime] = useSearchParams();
  const [searchPlatform , setSearchPlatform] = useSearchParams();
  const [userInput, setUserInput] = useState([" "]);
  const [userEmail, setUserEmail] = useState([" "]);
  const [userName , setUserName] = useState([" "]);
  const [userTime, setUserTime] = useState([" "]);
  
  const user = searchParams.get("username") || userName
  const timeHour = searchPlayerTime.get("hourplayed") || userTime
  const Platform = searchPlatform.get("platform") || "Steam"


  const handleSubmit = (event) => {
  event.preventDefault();

  axios.post(ApiPoint,{
    Platform,Hours:timeHour,Username:user,Email:userEmail,Comment:userInput
  }).then((res)=>{
          console.log("aces")
      }).catch((e)=>{
        console.log(e)
      })
  };
  


  return (
    <div>
        <div
      style={{
        width: '100%',
        minHeight: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage:
          'linear-gradient(90deg, rgb(189, 195, 199) 0.00%,rgb(3, 93, 25) 100.00%)',
      }}
    >
      <img
        src={logo}
        alt="image"
        style={{
          width: '380px',
          objectFit: 'cover',
          height: '360px',
          alignSelf: 'center',
        }}
      />
      <span
        style={{
          borderWidth: '1px',
          borderColor: 'var(--dl-color-gray-black)',
          borderStyle: 'ridge',
          alignSelf: 'center',
          textAlign: 'center',
          top: '433px',
          left: 'var(--dl-space-space-oneandhalfunits)',
          position: 'absolute',
          margin: 'auto',
          right: 'var(--dl-space-space-oneandhalfunits)',
          backgroundColor: 'rgb(217, 217, 217)',
        }}
      >
        Platform: {Platform}
      </span>
      <input
        type="text"
        placeholder="Username: "

        style={{
          top: '497px',
          //left: '463px',
          alignSelf: 'center',
          position: 'absolute',
        }}
      />
      
      <input
        type="text"
        placeholder="Email: "
        style={{
          top: '563px',
          //left: '465px',
          alignSelf: 'center',
          position: 'absolute',
        }}
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
      />
      <input
        type="text"
        placeholder="Username: "
        value={user}
        style={{
          top: '497px',
          //left: '463px',
          alignSelf: 'center',
          position: 'absolute',
        }}
        onChange={(event) => setUserName(event.target.value)}
      />
      
      <input
        type="text"
        placeholder="Time playing Ark: "
        value={timeHour}
        style={{
          top: '633px',
          //left: '462px',
          alignSelf: 'center',
          position: 'absolute',
        }}
        onChange={(event) => setUserTime(event.target.value)}
      />
      <input
        type="text"
        placeholder="Comment: "
        style={{
          width: '1182px',
          height: '65px',
          top: '700px',
          alignSelf: 'center',
          //left: '7px',
          position: 'absolute',
        }}
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
      />
      <button
        style={{
          top: '814px',
          //left: '540px',
          alignSelf: 'center',
          position: 'absolute',
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
    </div>
  )
}

export default Page2