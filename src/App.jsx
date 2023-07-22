/* eslint-disable react-hooks/exhaustive-deps */
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import "./styles/app.scss"
import Home from "./pages/Home.jsx"
import Header from "./components/Header.jsx"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"


const App = () => {
  const {setUser,setIsAuthenticated,setLoading,isLoading,isAuthenticated}=useContext(Context)
  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/users/me`,{withCredentials:true})
      .then((res)=>{
        console.log(isLoading)
        console.log(res)
        setUser(res.data.user)
        setIsAuthenticated(true)

        setLoading(false)
      })
      .catch((err)=>{
        console.log(isLoading)
        console.log(err)
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
        
      })

  },[isAuthenticated])



  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App