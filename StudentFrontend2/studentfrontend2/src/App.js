import Register from './components/Register';
import Login from './components/Login';
import StudentDetails from './components/StudentDetails';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './components/Layout';
import StudentList from './components/StudentList';
import { AuthProvider } from './components/auth';


function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="studentdetails" element={<StudentDetails />} />
        <Route path="studentlist" element={<StudentList />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
  </AuthProvider> 

  //<Register />
  //<Login />

  );
}

export default App;


