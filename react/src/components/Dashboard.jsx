import { Button } from 'react-bootstrap'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Meetings from './Meetings'
import './Dashboard.css'
export default function Dashboard() {
    const {currentUser,logout} = useAuth()
    const [view,setView] = useState(false)
    const history  = useHistory()
    async function handleLogout(){
        try{ 
          await  logout()
            history.push("/")
        }
        catch(err){
            return console.log("Failed To Logout!")
        }
    }
    
    
    return (
        <div className = "dashboard"> 
        <div  className="top-description"> 
            <h3>User: {currentUser.email}</h3>
            <div><Button variant="outline-danger" className="dashboard-btn"  onClick={handleLogout}>Logout</Button></div>
        </div>
        <div className="dashboard-meeting">
            <Button variant="outline-primary"  onClick={()=>{setView(prev=>setView(!prev))}}> {!view &&'View'}{view && 'Hide'} Meetings </Button>
        </div>
        {view && <Meetings rev={setView}></Meetings>}
       
        </div>
    )
}
