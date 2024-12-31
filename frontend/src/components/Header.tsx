import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'

const Header = () => {
  const auth=useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo/>
            <div>
              {auth?.isLoggedIn ?
              <><NavigationLink 
              bg="#00fffc" 
              to="/chat" 
              text='Go To Chat' 
              textColor='black'/>
              <NavigationLink 
              bg="#51538f" 
              to="/" 
              text='logout' 
              textColor='white'
              onClick={auth.logout} />
              
              </>:
              <>
              <NavigationLink 
              bg="#00fffc" 
              to="/login" 
              text='Login' 
              textColor='black'/>
              <NavigationLink 
              bg="#51538f" 
              to="/signup" 
              text='signup' 
              textColor='white'
               />
              </>}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header
