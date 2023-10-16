import { useRef, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { useAuth } from './auth'; // Update the import path with the correct path to your context file
import '../styles/Login.css'


//const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;/^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/;
const EMAILID_REGEX= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,20}$/;
const REGISTER_URL = '/login';

const Login = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    //const [login,setLogin]= useState(false);
    const [token,setToken] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // const [matchPwd, setMatchPwd] = useState('');
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAILID_REGEX.test(email));
    }, [email])

     useEffect(() => {
         setValidPwd(PWD_REGEX.test(pwd));
    //     setValidMatch(pwd === matchPwd);
    }, [pwd])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [email, pwd, matchPwd])

    const login = user => {
        setUser(user)
    }
    
    const logout = () => {
        setUser(null)
    }
    
    function storeCollector()
    {
        let store=JSON.parse(localStorage.getItem('login'))
        const response={
            data:{
                   token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU3NjA0NjMsImV4cCI6MTY5NTc5NjQ2M30.ImQOxmx0RhhCQhhjn5IkyjFvqB7xqN'
            }
    
        }
        if(store && store.login){
            setToken(response.data.token);
            //setLogin(true);
        }
        
    }

    useEffect(() => 
    {
        storeCollector();
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        auth.login(user)
        navigate('/StudentDetails')
        console.log('HandleSubmit is working')
        // if button enabled with JS hack
        const v1 = EMAILID_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
       
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ emailid: email, passwd: pwd }),
                {
                    headers: { 'Content-Type': 'application/json'}
                }
            );
            localStorage.setItem('login',JSON.stringify({
                login:true,
                token:response.data.token,
            }))
           
            storeCollector();
            /*componentDidMount()
                {
                  this.storeCollector();
            }*/
            
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            console.log(JSON.stringify(response.data.token))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPwd('');
            //setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Login Failed')
                
            }
            //errRef.current.focus();
        }
    }

    
    return (
        <>
           {success ? (
                <section>
                     <h1>Success!</h1>
                     <p>
                        <a href="/studentdetails">Click to access Student Details</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>LOGIN</h1>
                    <form  onSubmit={handleSubmit}>
                        <label htmlFor = "username">
                            Username
                        </label>
                        <input type = 'text'
                               onChange={(e) => setUser(e.target.value)}/>
                        <label htmlFor="emailid">
                            EmailId:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid "} />
                        </label>
                        <input
                            type="text"
                            id="emailid"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            //aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                       <button type='submit' onClick={handleSubmit}>Login</button>
                    </form>
                    <p>
                        Not registered?<br />
                        <span className="line">
                         <a href="/register">Register</a>
                        </span>
                    </p>
                </section>
            )}
       </>
    )
}

export default Login

