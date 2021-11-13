


import React, { useContext } from 'react'
import { Button} from 'react-bootstrap'
import { NavLink,useHistory } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import "./header.css"

export default function Header() {
    const history=useHistory()
    const{user}=useContext(AppContext)
    const handleLogout=()=>{
        localStorage.removeItem("user")
        history.push("/login")
  
        
    }
    return (
        <div className="header">
                <div className="header-container">
                    <div className="header-left">
                        <h4 className="logo">LOGO</h4>
                    </div>
                    <div className="header-right">
                        <ul className="menu">
                           { user.role==="admin" && <NavLink to="/" className="menu-item" exact activeStyle={{color:" white"}} >
                                 Courses
                            </NavLink>
}                           
                            <Button onClick={handleLogout} style={{marginLeft:"10px"}} className="btn btn-primary">Logout</Button>
                            
                        </ul>
                      
                    </div>
                </div>
                
            </div>
    )
}
