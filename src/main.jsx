/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createContext, useContext, useState } from "react"

export const server="https://nodejs-todo-ez95.onrender.com/api/v1"

export const Context = createContext({isAuthenticated:false})
export function AppWrapper({children}){
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [isLoading,setLoading]=useState(false)
  const [user,setUser]=useState({})
  const [refresh,setRefresh]=useState(false)
  return (
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,setLoading,isLoading,user,setUser,refresh,setRefresh}}>
      {children}
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
)
