// // import { useRef, useState, useEffect } from "react";
// // // import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import axios from '../api/axios';

// // const REGISTER_URL = '/fullname';

// // const StudentDetails = () => {
// //     const fullnameRef = useRef();
// //     const errRef = useRef();

// //     const [fullname, setFullname] = useState('');


// //      const [errMsg, setErrMsg] = useState('');
// //      const [success, setSuccess] = useState(false);

// //     useEffect(() => {
// //         fullnameRef.current.focus();
// //     }, [])



// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const checkName = async (name) => {
// //             const response = await axios.get(`/api/check-name?name=${name}`);
// //             return response.data.exists;
// //             }


// //         } catch (err) {
// //             if (!err?.response) {
// //                 setErrMsg('No Server Response');
// //             } else if (err.response?.status === 409) {
// //                 setErrMsg('Name Not There');
// //             } else {
// //                 setErrMsg('Registration Failed')
// //             }
// //             errRef.current.focus();
// //         }
// //     }

// //     return (
// //         <>

// //                     <h1>STUDENT DETAILS</h1>
// //                     <form  onSubmit={handleSubmit}>
// //                         <label htmlFor="studentdetails">
// //                             Fullnam:
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="fullname"
// //                             ref={fullnameRef}
// //                             onChange={(e) => setFullname(e.target.value)}
// //                             value={fullname}
// //                             required
// //                             onFocus={() => setFullname(true)}
// //                             onBlur={() => setFullname(false)}
// //                         />


// //                         <button >Submit</button>
// //                     </form>


// //             )
// //         </>
// //     )
// // }

// // export default StudentDetails

// // import { useForm } from "react-hook-form";
// // import axios from "axios";
// // import '../styles/StudentDetails.css'

// // const checkName = async (name) => {
// //   const response = await axios.get(`/api/check-name?name=${name}`);
// //   return response.data.exists;
// // };

// // function Input({ label, register, required }) {
// //   return (
// //     <>
// //       <label>{label}</label>
// //       <input  {...register(label, { required })} />
// //     </>
// //   );
// // }

// // const StudentDetails = ()=> {
// //   const { register, handleSubmit } = useForm();
// //   const onSubmit = (data) => console.log(data);

// //   return (
// //     <section>
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <Input className= 'a'label="Name" register={register} required />
// //       {/* <Input label="Role" register={register} required /> 

// //       <button type="submit">Submit</button>
// //       {/* <textarea onChange={(event)=>this.setState({post:event.target.value})}>
// //                     </textarea> */
// //     /*</form>
// //     </section>
// //   );
// // }
// // export default StudentDetails
// // import { useState, useEffect } from 'react';
// // import axios from '../api/axios';

// // const REGISTER_URL = '/'

// // const StudentDetails = () => {
// //   const [fullname, setFullname] = useState('');
// //   const [errMsg, setErrMsg] = useState('');

// //   useEffect(() => {
// //     setErrMsg('');
// //   }, [fullname])

// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(
// //         REGISTER_URL,
// //         {
// //           fullname: fullname,
// //         },
// //         {
// //           headers: { 'Content-Type': 'application/json; charset=UTF-8' },
// //         }
// //       );

//       // const response = await axios.post(REGISTER_URL, {
//       //   method: 'POST',
//       //   body: JSON.stringify({
//       //     fullname: fullname
//       //   }),
//       //   headers: { 'Content-Type': 'application/json ; charset:UTF-8' }
//       // })
//       console.log(response?.data);
//       //console.log(response?.accessToken);
//       console.log(JSON.stringify(response))

//     }

//     catch (err) {
//       if (!err?.response) {
//         setErrMsg('No Server Response');
//       } else if (err.response?.status === 409) {
//         setErrMsg('AAAA');
//       } else {
//         setErrMsg('Name is wrong')
//         console.log(err.response)
//       }
//       //errRef.current.focus();
//     }
//   }
//   return (
//     <form onSubmit={submitHandler} >
//       <div>
//         <label htmtfor='name'>Student Name:</label>
//         <input type='text'
//           id='name'
//           value={fullname}
//           onChange={e => setFullname(e.target.value)} />

//       </div>
//       <button type='submit'>Submit</button>
//     </form>
//   )
// }
// export default StudentDetails

// // import {useState,useEffect} from 'react';
// // const REGISTER_URL = '/students';

// // const StudentDetails = () => {

// //     const[fullname,setFullname] = useState('');
// //     const [posts,setPosts] = useState('');
// //     const [error, setError] = useState(null); // New state variable for error handling


// //     useEffect (() => {
// //         fetch( REGISTER_URL)
// //         .then((response) => response.json())
// //         .then((data) => {
// //             setFullname(data.fullname); // Set fullname from data
// //             setPosts(data.posts); // Set posts from data (if available)
// //           })
// //           console.log(data)
// //         .catch((err) =>
// //         {
// //             console.error(err)
// //         })
// //     },[])

// //     return(
// //         <div>
// //             <ul>
// //                 {posts.map = (post)=>{
// //                     return <li key={post.id}>{post.title}</li>
// //                 }}
// //             </ul>
// //         </div>
// //     )
// // }

// // export default StudentDetails

// // import { useState, useEffect } from 'react';

// // const REGISTER_URL = '/students';

// // const StudentDetails = () => {
// //   const [fullname, setFullname] = useState('');
// //   //const [posts, setPosts] = useState([]);
// //   const [error, setError] = useState(null); // New state variable for error handling

// //   useEffect(() => {
// //     fetch(REGISTER_URL)
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then((data) => {
// //         if (data && data.fullname && Array.isArray(data.posts)) {
// //           setFullname(data.fullname);
// //           setPosts(data.posts);
// //         } else {
// //           throw new Error('Invalid data structure in API response');
// //         }
// //       })
// //       .catch((err) => {
// //         setError(err); // Set the error state
// //         console.error(err);
// //       });
// //   }, []);

// //   if (error) {
// //     return <div>Error: {error.message}</div>;
// //   }

// //   return (
// //     <div>
// //       <p>Fullname: {fullname}</p>
// //       <ul>
// //         {posts.map((post) => (
// //           <li key={post.id}>{post.title}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default StudentDetails

import {useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import {Card} from '@material-ui/core';
import {useAuth} from './auth';
import {useNavigate} from 'react-router-dom';


const StudentList = () => {
  const [studentlist, setStudentList] = useState([]);
  const studentdataList = async () => {
    const result = await fetch("http://localhost:8080/loginuser");
    const studentResult = await result.json();
    setStudentList(studentResult);
    console.log(studentResult[0].name);
    
  };
  const auth= useAuth();
  const navigate = useNavigate();

  function present(name){
    console.log(name);
  }

  useEffect(() => {
    studentdataList();
  },[]);

  return (
    <div>
      {studentlist.map((student) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title> {student.name} </Card.Title>
              
              <Button onClick={() => present(student.name)}>present</Button>
              <Button>abscent</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default StudentList;
