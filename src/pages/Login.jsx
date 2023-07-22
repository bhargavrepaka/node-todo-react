import { useContext, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { Context, server } from "../main"
import axios from "axios"
import { toast } from "react-hot-toast"


const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {isAuthenticated,setIsAuthenticated,setLoading,isLoading} = useContext(Context)

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try {
            const {data}= await axios.post(`${server}/users/login`,{email,password},{withCredentials:true})
            console.log(data)
            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
            toast.error("some error")
            setLoading(false)
        }
    }

    if(isAuthenticated) return <Navigate to={"/"}></Navigate>

  return (
    <div className='login'>
        <section>
            <form action="" onSubmit={handleSubmit}>
                <input type="email"  placeholder="email"
                onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder="password"
                onChange={(e)=>setPassword(e.target.value)} value={password} />
                <button disabled={isLoading} type="submit">Login</button>
                <h4>OR</h4>
                <Link to={"/register"}>Register</Link>
            </form>
        </section>
    </div>
  )
}

export default Login