import React, { useState, useEffect } from 'react'
import { Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { List } from '@phosphor-icons/react'
import style from "./NavBar.module.css"
import StonksHub_Photo from "../../assets/StonksHub_Trademark.png"
import shGIF from "../../assets/StonksHubGIF.gif"
import axios from 'axios'


function NavBar_pr() {
  const [user, setUser] = useState(false)
  const apiUrl  = import.meta.env.VITE_API_URL;

  useEffect(() => {
       let timeout;

     const fetchData = () => {
 
       Promise.allSettled([
     axios.get(`${apiUrl}/api/v1/users/get-user`, {
       withCredentials: true
     })
 
       ])
       .then(([res1, res2, res3, res4]) => {
         if(res1?.value?.data?.success == true){
           setUser(true)
         } else{
           console.log("Not Signed in!")
           setUser(false)
         } 
       })
       .finally(() => {
         timeout = setTimeout(fetchData, 5000)
       })
 
 
     }    
     fetchData();
      return () => {
       clearTimeout(timeout)
     };
   }, []);

 const navigate = useNavigate()
 const [dropdownOpen, setDropdownOpen] = useState(false)
  const mouseEnterDropdown = () => {
    setDropdownOpen(state => !state)
  }
  const mouseLeaveDropdown = () => {
    setDropdownOpen(false)
  }
  const handleLogOut =  () => {
    axios.get(`${apiUrl}/api/v1/users/logout`,{withCredentials: true})
    .then(() => {
      alert("Log-out successful!")
      navigate("/")
    })
    .catch((err) => console.log(`Error in Logging-out ${err}`))
  }
  return (
    <>
      <Navbar className={style.navbar}  expand="sm"  collapseOnSelect={true}>
        <Container>
        <Navbar.Brand className={style.navbrand} onClick={() => navigate("/dashboard")} >
          {/* <img className={style.logo} src={StonksHub_Photo}/> */}
          <img className={style.logo} src={shGIF} />
        </Navbar.Brand>
        
        <Navbar.Toggle style={{border: "none", color: 'transparent'}}  >
          <List weight='fill' fill='black' size={32}/>
        </Navbar.Toggle>

          

        <Navbar.Collapse>
          <Nav className='ms-auto' style={{color: "white"}} >
          <Nav.Link href='#' className={`${style.navilinkoMAIN}`} onClick={() => navigate("/")}>Home</Nav.Link>
            
            
          <Nav.Link href='#' className={`${style.navilinkoMAIN}`} onClick={() => navigate("/dashboard")}>Dashboard</Nav.Link>
          <Nav.Link href='#' className={`${style.navilinkoMAIN}`} onClick={() => navigate("/portfolio")}>Portfolio</Nav.Link>
          {user? <Nav.Link href='#' className={`${style.navilinkoMAIN}`} onClick={() => handleLogOut()}>Log-out</Nav.Link> : <></>}
          

          
            
          </Nav>
            
        </Navbar.Collapse>
        </Container>
        
      </Navbar>
    </>
  )
}

export default NavBar_pr
