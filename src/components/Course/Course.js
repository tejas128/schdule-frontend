import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../header/Header'
import Courselist from './Courselist'
import CreateCourse from './CreateCourse'


export default function Course() {
    return (
        <>
            <Header />

            <Container>
           
               
                <Courselist />

            </Container>

        </>
    )
}
