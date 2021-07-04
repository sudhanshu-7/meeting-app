
import React, { useRef,useState } from 'react'
import { Card,Form,Button,Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Forgot() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message,setMessage] = useState('')
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check Your Email For Further Steps")
        }
        catch{
            setError("Failed To Reset Password")
        }
        setLoading(false)
    }
    return (
        <>
            <Card className="center">
                <Card.Body>
                    <h2 className = "text-center mb-4">
                        Reset Password
                    </h2>
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="sucess">{message}</Alert>}
                        
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}/>
                        </Form.Group>
                        
                        <Button disabled ={loading} className="top-margin" type="submit" style={{width:'100%'}}>Reset</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Login</Link> 
            </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need An Account? <Link to="/signup">Sign UP</Link> 
            </div>
        
        </>
    )
}
