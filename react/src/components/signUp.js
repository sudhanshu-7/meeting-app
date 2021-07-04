// import { Alert } from 'bootstrap'
import React, { useRef,useState } from 'react'
import { Card,Form,Button,Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault()
        if(confirmPasswordRef.current.value !== passwordRef.current.value){
            console.log(confirmPasswordRef.current.value,passwordRef.current.value)
            setError("Password Doesn't Match")
            return 
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        }
        catch{
            setError("Something Went Wrong!")
        }
        setLoading(false)
    }
    return (
        <>
            <Card className="center">
                <Card.Body>
                    <h2 className = "text-center mb-4">
                        SignUp
                    </h2>
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert dismissible variant="danger">{error}</Alert>}
                        
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" required ref={confirmPasswordRef}/>
                        </Form.Group>
                        <Button disabled ={loading} className="top-margin" type="submit" >Sign UP</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already Have An Account? <Link to="/login">Login</Link> 
            </div>
        </>
    )
}
