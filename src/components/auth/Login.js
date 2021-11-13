
import axios from 'axios'
import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import dotenv from "dotenv"
import { AppContext } from '../../context/AppContext'
dotenv.config()
export default class Login extends Component {
    static contextType=AppContext
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })


    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const {error,...rest}=this.state
        try{
        const res=await axios.post(`${process.env.REACT_APP_APIURL}/login`,rest)
        console.log(res.data)
       
        this.context.dispatch({type:"LOGIN_SUCESS",payload:res.data})
        localStorage.setItem("user",JSON.stringify(res.data))
         if(res.data.role==="admin"){
            this.props.history.push("/")
         }else{
            this.props.history.push("/instructor")
         }
        
   
        }catch(e){
            if(e.response){
                console.log(e.response.data.message)
             
                this.setState({
                    error:e.response.data.message
                })
                
            }
         
        }

    }
    render() {
        return (
            <>
              <h2 style={{ color: "#3e8ef7",textAlign:"center",marginTop:"20px" }}> LOGIN</h2>
            <Container className="d-flex justify-content-center">
              
               
                <Form style={{width:"60%"}} onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" onChange={this.handleChange} placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" onChange={this.handleChange} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {this.state.error && <p style={{color:"red"}}>{this.state.error}</p>}
                </Form>
               
            </Container>
            </>
        )
    }
}
