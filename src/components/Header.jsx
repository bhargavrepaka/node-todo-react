/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Header = () => {

  const {isAuthenticated,setIsAuthenticated,setLoading,isLoading}=useContext(Context)


  async function logoutHandler(e){
    setLoading(true)
    try {
        const {data}= await axios.get(`${server}/users/logout`,{withCredentials:true})
        console.log(data)
        toast.success("Tata...See you again :) ")
        setIsAuthenticated(false)
        setLoading(false)
    } catch (error) {
        console.log(error)
        toast.error("Error logging out...")
        setLoading(false)
    }
}

  return (
    <nav className='header'>
        <div>
            <h2>Todo</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {
              isAuthenticated?
              <button disabled={isLoading} onClick={logoutHandler} className='btn'>Logout</button>
              :<Link to={"/login"}>Login</Link>

            }
            
            
        </article>
    </nav>
  )
}

export default Header