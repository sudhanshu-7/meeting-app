import { Button } from 'react-bootstrap'
import {React,useState,useRef} from 'react'
import './MeetingCard.css'
export default function MeetingCard(props) {
    function handleDelete(){
        props.deleteById(props.details.id)
        // console.log(props.details.id)
        return;
    }
    const description = useRef()
    const start = useRef()
    const end = useRef()
    const title = useRef()
    const [visUpdateForm , setVisUpdateForm] = useState(false)
    function handleUpdate(){
        setVisUpdateForm(false)
        const body = {
            description:description.current.value,
            start:start.current.value,
            end:end.current.value,
            title:title.current.value,
            email:props.details.email
        }
        props.updateById(props.details.id,body)
        return;
    }

    return (
        <>
        <div className="meeting-card">
            <div>

                <h2 className="bolder">{props.details.title}</h2>           
                <h3><em>&#10077; {props.details.description} &#10078;</em></h3>        
                <h4>&#9658;{new Date(props.details.start).toLocaleString()}</h4>  
                <h4>&#9658;{new Date(props.details.end).toLocaleString()}</h4>    

            </div>
            <div className="meeting-change">
                {!visUpdateForm && 
                <div className="meeting-options">
                <div><Button variant="warning" onClick={()=>setVisUpdateForm(true)}>EDIT</Button></div>
                <div><Button variant="danger" onClick={handleDelete}>DELETE</Button></div>
                </div>
                }
                {visUpdateForm && 
                <div className = "updateForm">
                    <form onSubmit={handleUpdate}> 
                <label for="id">Title:</label>
                <input placeholder={props.details.title} ref={title} type="text" id="title"/><br/>
                <label for="description">Description:</label>
                <input placeholder={props.details.description} id="description" ref={description} type = "text"/><br/>
                <label for id="start">Starting Time: </label>
                <input placeholder={props.details.start} ref={start} type="datetime-local"/><br/>
                <label for id="end">Ending Time: </label>
                <input placeholder={props.details.end} ref={end} type="datetime-local"/><br/>
                <Button variant="primary" type="submit">UPDATE</Button>
                <Button variant="danger" onClick={()=>{setVisUpdateForm(false)}}>&#10060;</Button>
            </form>
                </div>}
            </div>
            
        </div>
        <hr/>
        </>
    )
}
