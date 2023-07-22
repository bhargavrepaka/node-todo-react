/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const {user,isAuthenticated,isLoading}=useContext(Context)

  if(!isAuthenticated) return <Navigate to={"/login"}></Navigate>
  return (
    <>
      {
      isLoading ? <h1>Loading </h1>
      :
      <div>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
      </div>

    }
    </>
    
  )
}

export default Profile