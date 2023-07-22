/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Todo = ({title,description,isCompleted,id,handleUpdate,handleDelete }) => {
  return (
    <>
     <div className='todo'>
      <div>
        <h4>{title}</h4>
      <p>{description}</p>
     </div>
     <div>
      <input type="checkbox" checked={isCompleted}  onChange={()=>handleUpdate(id,title)}/>
      <button className='btn' onClick={()=>handleDelete(id,title)}> Delete</button>
     </div>
    </div>
     
        
    </>
   
  )
}

export default Todo