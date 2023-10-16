/*import {Outlet} from 'react-router-dom'
import React from 'react'

const Layout = () => {
  return (
   <main className='App'>
    <Outlet />
   </main>
  )
}

export default Layout*/
import {Outlet} from "react-router-dom";
import '../styles/Layout.css'
import {useAuth} from './auth'

const Layout = () => {
    const auth = useAuth()
    return (
        <>
            <h1>STUDENT REGISTRATION/LOGIN</h1>
            <nav className="navbar">
                
                <div className="links">
                <ul>
                    <li>
                        <a href="/">Home</a>
                        
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/studentdetails">Student Details</a>
                    </li>
                    <li>
                        <a href="/studentlist">Student List</a>
                    </li> 
                            
                </ul>
                </div>
            </nav>
       
                <div className='logo'>
               
                <img  src="https://th.bing.com/th?id=OIP.OL1mBGRIGfBG71pxWil9wwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" width= "300" height= "300"alt='Student Pic'/>
                </div>
                  {/* <div  className='logo1'>
                <img src='https://th.bing.com/th/id/OIP.sfK6G3pqAzWbyNwhMs5bhQHaE3?pid=ImgDet&rs=1' height="200"alt="welcome logo" />
                </div>    */}
            <Outlet />
            {!auth.user &&(
                // <NavLink style ={navLinkStyles} to = '/login'>
                // Login
                // </NavLink>
                <a href="/login">Login</a>
            )}
        </>
    )
};

export default Layout;

