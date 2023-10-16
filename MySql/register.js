import React from 'react';
import { useRef, useEffect, useState } from React;
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { fontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = '/^[a-zA-Z][a-zA-Z0-9-_]{3,23}#/';
const PWD_REGEX = '/^(?=*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%$]).{8,24}$/';



const register = () => {
    const userRef = useRef();
const errRef = useRef();

const [user, setUser] = useState('');
const [validName, setValidName] = useState('false');
const [userFocus, setUserFocus] = useState('false');

const [pwd, setPwd] = useState('');
const [validPwd, setValidPwd] = useState('false');
const [pwdFocus, setPwdFocus] = useState('false');

const [matchPwd, setmatchPwd] = useState('');
const [validmatch, setValidMatch] = useState('false');
const [matchFocus, setmatchFocus] = useState('false');

const [errMsg, setErrMsg] = useState('');
const [success, setSuccess] = useState('false');

useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
}, [user])

useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
}, [pwd, matchPwd])


useEffect(() => {
    setErrMsg('');
}, [user, pwd, matchPwd])


useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
}, [user])

useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
}, [pwd, matchPwd])


useEffect(() => {
    setErrMsg('');
}, [pwd, matchPwd])

    return (
        <div>register</div>
    )
}

export default register


