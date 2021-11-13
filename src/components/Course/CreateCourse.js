import axios from 'axios'
import React, { Component } from 'react'
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap'
import { AppContext } from '../../context/AppContext'
import Header from '../header/Header'

export default class CreateCourse extends Component {
    static contextType = AppContext
    constructor(props) {

        super(props)
        this.state = {
            name: "",
            level: "",
            desc: "",
            date: "",
            time: "",
            lectures: [],
            users: [],
            select: true,
            message: "",
            image: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchusersBydate = this.fetchusersBydate.bind(this)
        this.handletimechange = this.handletimechange.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    fetchusersBydate = async (date) => {
        try {
            const res = await axios.get(`http://localhost:5000?date=${date}`)
            console.log(res.data)
            this.setState({
                users: [...res.data]
            })
            console.log(this.state.users)
        } catch (e) {

        }
    }
    handleClear = () => {
        this.setState({
            name: "",
            level: "",
            desc: "",
            date: "",
            time: "",
            lectures: [],
            users: [],
            select: true,
            message: ""
        })
    }
    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        })
        if (e.target.name === "date") {
            this.setState({
                select: false
            })
            this.fetchusersBydate(e.target.value)

        }



    }
    handleselectChange = (e) => {

        var user = this.state.users.find(u => u._id === e.target.value)
        const lect = {
            name: user.name,
            date: this.state.date,
            insId: e.target.value,
            time: this.state.time
        }
        const temp = this.state.users.filter((u) => u._id != e.target.value)
        this.setState({ users: temp })

        this.setState({
            lectures: [...this.state.lectures, lect]
        })


    }
    handletimechange = (e) => {
        var timeSplit = e.target.value.split(':'),
            hours,
            minutes,
            meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        var time = hours + ':' + minutes + ' ' + meridian
        this.setState({
            time: time
        })
        console.log(time)

    }

    handleSubmit = async (e) => {
        e.preventDefault()
        var formData = new FormData();
        formData.append("image", this.state.image)
        formData.append("name", this.state.name)
        formData.append("desc", this.state.desc)
        formData.append("date", this.state.date)
        formData.append("time", this.state.time)
        formData.append("lectures", JSON.stringify(this.state.lectures))
        formData.append("level", this.state.level)

        try {
            const res = await axios.post("http://localhost:5000/course", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.context.user.token}`
                    }
                }
            )
            console.log(res.data)
            this.setState({
                message: "course created sucessfully."
            })
            this.props.fetchCourses()
        } catch (e) {
            console.log(e)
        }
    }
    handlefilechange = (e) => {
        this.setState({ image: e.target.files[0] })
        console.log(e.target.files[0])
    }
    render() {

        return (
            <>

                <Container>

                    <div className="d-flex mt-5 align-items-center justify-content-between">
                        <h5 className="text-center ">Create Course </h5>

                        <Button onClick={this.handleClear}>Clear</Button>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Name :
                            </Form.Label>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="enter course name" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Level:
                            </Form.Label>
                            <Form.Control type="text" name="level" value={this.state.level} onChange={this.handleChange} placeholder="enter level of course" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Description:
                            </Form.Label>
                            <Form.Control as="textarea" name="desc" value={this.state.desc} onChange={this.handleChange} placeholder="enter course description" required />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Course Image:</Form.Label>
                            <Form.Control type="file" onChange={this.handlefilechange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Time:
                            </Form.Label>
                            <Form.Control type="time" name="time" onChange={this.handletimechange} required />


                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Date:
                            </Form.Label>
                            <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleChange} onChange={this.handleChange} required />
                        </Form.Group>








                        <Form.Group>
                            <Form.Label>
                                Select instructor:
                            </Form.Label>
                            <Form.Select onChange={this.handleselectChange} aria-label="Floating label select example" disabled={this.state.select} required>
                                <option>Select date to open menu</option>
                                {
                                    this.state.users.map((u) => (
                                        <option value={u._id}>{u.name}</option>

                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        {this.state.lectures.map((i) => (
                            <Alert className="mt-3" variant="info">Date:-{i.date} Time:-{i.time} Instructor:-{i.name}</Alert>
                        ))}
                        <Button className="mt-2" variant="primary" type="submit">
                            Submit
                        </Button>
                        {this.state.message && <p className="mt-2">{this.state.message}</p>}

                    </Form >
                </Container>
            </>

        )
    }
}

