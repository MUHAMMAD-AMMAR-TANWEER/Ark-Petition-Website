import React from 'react'
import logo from "./logo.jpeg"
import { useNavigate } from "react-router-dom";


function Page1() {

    let playstation = useNavigate(); 
  const playstationChange = () =>{ 
    let path = `/join?platform=Playstation`; 
    playstation(path);
  }


      let xbox = useNavigate(); 
  const xboxChange = () =>{ 
    let path = `/join?platform=Xbox`; 
    xbox(path);
  }

  

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
          width: '300px',
          objectFit: 'cover',
          height: '300px',
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
          top: '320px',
          left: 'var(--dl-space-space-oneandhalfunits)',
          position: 'absolute',
          margin: 'auto',
          right: 'var(--dl-space-space-oneandhalfunits)',
          backgroundColor: '#D9D9D9',
        }}
      >
        <span>
          Wildcard don&apos;t want you to be able to own the items you have when
          playing their game.
        </span>
        <br></br>
        <br></br>
        <span>The community disagrees.</span>
        <br></br>
        <br></br>
        <span>
          Over many social media platforms we Ark players see other players
          selling their items/tames/base locations with no care for the code of
          conduct.
        </span>
        <br></br>
        <br></br>
        <span>
          Many accounts get banned for trading but the majority do not.
        </span>
        <br></br>
        <span>
          We believe that the choice should be up to you, the community.
        </span>
        <br></br>
        <span>This is your opportunity to let your voice be heard.</span>
        <br></br>
        <span>
          Connect your account &amp; sign this petition if you support an
          official marketplace that resales can be conducted on.
        </span>
        <br></br>
        <span>
          Let the scamming end, let&apos;s change this unsafe &amp; black market
          to a safe &amp; legal market where players can get paid for their
          commitment to the game.
        </span>
      </span>
      <button
        style={{
          left: 'var(--dl-space-space-sixunits)',
          position: 'absolute',
          top: '600px',
          alignSelf: 'center',
          margin: 'auto',
          right: 'var(--dl-space-space-sixunits)',
          textAlign: 'center',
        }}
        onClick={playstationChange}
      >
        I play on Playstation
      </button>
      <button
        style={{
          left: 'var(--dl-space-space-sixunits)',
          position: 'absolute',
          alignSelf: 'center',
          paddingRight: 'var(--dl-space-space-oneandhalfunits)',
          top: '640px',
          margin: 'auto',
          right: 'var(--dl-space-space-sixunits)',
          textAlign: 'center',
        }}
        onClick={xboxChange}
      >
        I play on Xbox
      </button>
      <button
        style={{
          // height: '40px',
          left: 'var(--dl-space-space-sixunits)',
          alignSelf: 'center',
          position: 'absolute',
          top: '680px',
          margin: 'auto',
          right: 'var(--dl-space-space-sixunits)',
          textAlign: 'center',
        }}
        onClick={() => { window.location.href = 'http://164.92.86.165:4000/api/auth/steam'; }}
      >
        I play on Steam
      </button>
    </div>
    </div>
  )
}

export default Page1