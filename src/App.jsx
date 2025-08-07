import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import CardEmployee from './components/EmployeeCard'
import { system } from './config/config'

function App() {
  
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      
      <h1 style={{color: 'black'}}>{system.name}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', borderRadius: '40px', padding: '50px', backgroundColor: 'lightgray' }}>
        <div style={{ display: 'flex', alignItems: 'left' }}>
          <h3 style={{color: 'black'}}>{system.descritption}</h3>
        </div>
        <div style={{ display: 'flex',flexDirection:'row', gap: '20px', }}> 
          <CardEmployee cardColor={'red'} name={'Taiyo'} sex={'male'} id={1}/>
          <CardEmployee cardColor={'yellow'} name={'Aom'} sex={'female'} id={2}/>
          <CardEmployee cardColor={'green'} name={'Com'} sex={'male'} id={3}/>
          <CardEmployee cardColor={'gray'} name={'Miw'} sex={'female'} id={4}/>
        </div>
  
    </div>
    </div>
    </>
  )
}

export default App
