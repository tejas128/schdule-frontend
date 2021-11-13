
import axios from 'axios'
import React, { Component } from 'react'
import { Table, Button,Modal } from 'react-bootstrap'
import { AppContext } from '../../context/AppContext'
import CreateCourse from './CreateCourse'

export default class Courselist extends Component {
    static contextType=AppContext
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            course: {},
            show: false
        }
        this.fetchCourses = this.fetchCourses.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleShow=this.handleShow.bind(this)
    }
    componentDidMount() {
        this.fetchCourses()
    }
    fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/course',{
                headers: {
                    'Authorization': `Bearer ${this.context.user.token}`
                }
            })
            console.log(res.data)
            this.setState({ courses: res.data })
        } catch (e) {
            console.log(e)
        }

    }
    handleClose=()=>{
        this.setState({
            show:false
        })
    }
    handleShow=()=>{
        this.setState({
            show:true
        })
    }

    render() {
        return (
            <>
                <CreateCourse fetchCourses={this.fetchCourses} />
                <h3 className="text-center">Course List</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>name</th>
                            <th>level</th>
                            <th>lectures</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.courses.map((c, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{c.name}</td>
                                <td>{c.level}</td>
                                <td>{c.lectures.map((lec) => (
                                    <p>  {lec.date} {lec.time} By :-  {lec.name} </p>


                                ))}</td>
                                <td>{c.desc}</td>
                                <td><Button onClick={
                                    () => {
                                        this.setState({ course: c })
                                        this.setState({
                                            show:true
                                        })
                                    }
                                }>View</Button></td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Course Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img style={{width:"100%"}} src={this.state.course.img}/> 
                      <h5>Name:</h5>  
                      <p> {this.state.course.name}</p>
                      <h5>Description:</h5>
                      <p>{this.state.course.desc}</p>
                      <h5>Level:</h5>
                      <p>{this.state.course.level}</p>
                      <h5>Schedule lectures for instructors:</h5>
                      {this.state.course.lectures && this.state.course.lectures.map((lec)=>(
                          <p>{lec.date} {lec.time} By :- {lec.name}</p>
                      ))}

                    </Modal.Body>

                </Modal>
            </>
        )
    }
}
