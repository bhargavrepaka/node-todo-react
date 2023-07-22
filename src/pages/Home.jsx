/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Context, server } from "../main"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import Todo from "../components/Todo"

const Home = () => {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const {isAuthenticated,setIsAuthenticated,setLoading,isLoading,refresh,setRefresh} = useContext(Context)
    const [allTasks,setAllTasks]=useState([])

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)

        try {
            const {data}=await axios.post(`${server}/tasks/new`,{title,description:desc},{withCredentials:true})
            console.log(data)
            setLoading(false)
            setRefresh((prev)=>!prev)
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
            setRefresh((prev)=>!prev)
        }
        
        setTitle("")
        setDesc("")
    }

    useEffect(()=>{
        axios.get(`${server}/tasks/my`,{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                setAllTasks(res.data.tasks )
            }).catch((er)=>{
                console.log(er)
            })
    },[refresh])

    async function handleUpdate(id,title){
        try {
            const res = await axios.put(`${server}/tasks/${id}`,{},{withCredentials:true})
        console.log(res)
        toast.success(`updated ${title}`)
        setRefresh((prev)=>!prev)
        } catch (error) {
            console.log(error)
            setRefresh((prev)=>!prev)
        }
        
    }
    async function handleDelete(id,title){
        try {
            const res = await axios.delete(`${server}/tasks/${id}`,{withCredentials:true})
            console.log(res)
            toast.error(`deleted ${title}`)
            setRefresh((prev)=>!prev)
        } catch (error) {
            console.log(error)
            setRefresh((prev)=>!prev)
        }
    }

    if(!isAuthenticated) return <Navigate to={"/login"}></Navigate>
  return (
    <div  className="container">
        <div className='login'>
        <section>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"  placeholder="title" name="title"
                onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <input type="text"  placeholder="text" name="description"
                onChange={(e)=>setDesc(e.target.value)} value={desc}/>
                <button disabled={isLoading} className="btn">Add Task</button>
            </form>
        </section>
    </div>


    <section className="todosContainer">
    {
        allTasks.map((i)=>{
           return <Todo key={i._id} id={i._id} title={i.title} description={i.description} isCompleted={i.isCompleted} handleUpdate={handleUpdate} handleDelete={handleDelete}></Todo>
        })
    } 
    </section>
    </div>
  )
}

export default Home