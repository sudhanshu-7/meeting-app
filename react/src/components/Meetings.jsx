import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import MeetingCard from './MeetingCard'
import {  Button } from 'react-bootstrap'
import { useRef } from 'react'
import './Meeting.css'
export default function Meetings(props) {
    const {currentUser} = useAuth()
    const [visForm , setVisForm] = useState(false)
    const [error,setError]= useState("")
    const [DATA,setDATA] = useState([])
    let calling = ""
    useEffect(()=>{
        const req = async ()=>{
            try{   
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${currentUser.email}`,{
                
            })
            const responseData = await response.json()
            setDATA(responseData.events || [])
            }catch(err){
                setError(err)
            }
        }
        req()
        
    },[currentUser.email,calling])

    const description = useRef()
    const start = useRef()
    const end = useRef()
    const title = useRef()
    async function  handleNewEventSubmit(event){
        event.preventDefault();
        const body  = {
            description:description.current.value,
            email:currentUser.email,
            start: new Date(start.current.value),
            title:title.current.value,
            end : new Date(end.current.value)
        }
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(body)
            })
            const rData = await response.json()
            DATA.push(rData.event)
            console.log(rData)
            props.rev(prev => !prev)
            
        }catch(err){
            return console.log(err)
        }
    }
    async function deleteByID(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${id}`,{
                method:"DELETE"
            })
            const rD = await response.json()
            console.log(rD)
            props.rev(prev => !prev)
        }catch(err){
            console.log(err)
        }
    }
    async function updateById(id,param){
        setError("")
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(param)
            })
            const rD = await response.json()
            console.log(rD)
            props.rev(prev => !prev)
        }catch(err){
            
            return console.log(err)
        }
    }
    return (
        <>
        {
            DATA.map(event => <MeetingCard updateById={updateById } deleteById = {deleteByID} details ={event}/>)
        }
        <div className="meeting-new-button"> 
        <Button variant="outline-secondary" onClick={()=>setVisForm(prev => setVisForm(!prev))}>
            ADD A MEETING
        </Button>
        
        </div>
        {visForm && 
            <div className="new-form">
                <form onSubmit={handleNewEventSubmit} className="new-meeting-form"> 
                 <label for="id">Title:</label><br/>
                <input ref={title} type="text" id="title"/><br/>
                <label for="description">Description:</label><br/>
                <input id="description" ref={description} type = "text"/><br/>
                <label for id="start">Starting Time: </label><br/>
                <input ref={start} type="datetime-local"/><br/>
                <label for id="end">Ending Time: </label><br/>
                <input ref={end} type="datetime-local"/><br/>
                <Button variant="primary" className="new-form-button" type="submit">Add A Meeting</Button>
            </form>
            </div>
        
        }
        </>
    )
}
