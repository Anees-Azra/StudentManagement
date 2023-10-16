// // StudentList.js

// /*import React from 'react';

// function StudentList({ students }) {
//   return (
//     <div>
//       <h2>Student List</h2>
//       <ul>
//         {students.map((student) => (
//           <li key={student.StudentID}>{student.StudentName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default StudentList;*/
    import React from "react";
    import { useState } from "react";
    import Axios from "axios";
    //import { useNavigate } from "react-router-dom"; 
    function StudentList() {
      const [studentList, setStudentList] = useState([]);
    
      //let navigate = useNavigate();
    

      const getStudent = () => {
        Axios.get("http://localhost:8080/students").then((response) => {
            setStudentList(response.data.data);
        });
      };
    
     
    
      return (
        <div className="students">
          <button onClick={getStudent}>Show Students</button>
          
          {studentList.map((val, key) => {
            return (
              
              <div className="student">
                <div>
                  <h3>Userid: {val.userid}</h3>
                  <h3>Studentid: {val.studentid}</h3>
                  <h3>Fullname: {val.fullname}</h3>
                  <h3>Date Of Birth: {val.dob}</h3>
                  <h3>UIN: {val.uin}</h3>
                </div>
               
              </div>
            );
          })}
        </div>
      );
    }
    export default StudentList;
