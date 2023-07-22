
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from "react-hot-toast"
import { Context, server } from '../main'


const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {isAuthenticated,setIsAuthenticated,isLoading,setLoading} = useContext(Context)

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try {
            const {data} =await axios.post(`${server}/users/new`,{name,email,password},{withCredentials:true})
            console.log(data)
            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            console.log("hah the error",error.message)
            setIsAuthenticated(false)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    if(isAuthenticated) return <Navigate to={"/"}></Navigate>

  return (
    <div className='register login '>
        <section>
            <form action="" onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                 />
                <input 
                type="email"  
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                <button disabled={isLoading} type="submit">Register</button>
                <h4>OR</h4>
                <Link to={"/Login"}>Login</Link>
            </form>
        </section>
    </div>
  )
}

export default Register