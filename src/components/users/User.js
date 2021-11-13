import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Container, Card } from 'react-bootstrap'
import { AppContext } from '../../context/AppContext'
import Header from '../header/Header'

export default function User() {
    const [courses, setcourses] = useState([])
    const { user } = useContext(AppContext)
    useEffect(() => {

        fethCourses()
    }, [])

    const fethCourses = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_APIURL}/course/${user.id}`)
            console.log(res.data)
            setcourses(res.data)
        } catch (e) {
            console.log(e)

        }
    }
    return (
        <>
        <Header/>
        <Container>
            
            {courses.map((c, i) => (
                <Card style={{ width: '18rem',marginTop:"20px" }}>
                  
                    <Card.Body>
                        <Card.Title>{c.name}</Card.Title>
                        <Card.Text>
                            <img style={{ width: "100%" }} src={c.img} />
                            <h5>Name:</h5>
                            <p> {c.name}</p>
                            <h5>Description:</h5>
                            <p>{c.desc}</p>
                            <h5>Level:</h5>
                            <p>{c.level}</p>
                            <h5>Schedule lectures for instructors:</h5>
                           
                          <p>{c.lectures.date} {c.lectures.time} By :- {c.lectures.name}</p>
                     
                        </Card.Text>

                    </Card.Body>
                </Card>
            ))}
        </Container>
        </>
    )
}
