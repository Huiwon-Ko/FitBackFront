import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import { Link, Route } from "react-router-dom";
import './css/Login_Register.css';
import GoogleButton from "./components/GoogleButton";
import NaverButton from "./components/NaverButton";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const baseUrl = "http://localhost:8080";  //수정한 부분(baseURL)

    
    const userRef = useRef();
    const errRef = useRef();

    const [username, setName] = useState('');

    const [phone, setPhone] = useState('');

    const [email, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(baseUrl +"/auth/signup",
                JSON.stringify({ username, phone, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // 배포 전에 console.log 관련 내용은 다 지워져야합니다. 
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response))
            setSuccess(true);
            
            setName('');
            setPhone('');
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1> 
                    <p>
                        <Link to="/Login">로그인 하기</Link> 
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>회원가입</h1>

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="username">
                            이름
                        </label>
                        <input
                            type="text"
                            id="username"
                        />

                        <label htmlFor="phone">
                            전화번호
                        </label>
                        <input
                            type="text"
                            id="phone"
                            required
                        />

                        <label htmlFor="email">
                            아이디(이메일)
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />


                        <label htmlFor="password">
                            비밀번호
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                            //aria-invalid={validPwd ? "false" : "true"}
                            //aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p /*이 부분은 아이디/패스워드의 제한 조건을 설정하는 부분입니다. 필요하시다면 바꿔서 사용하셔도 괜찮고 아니라면 삭제하셔도될것 같습니다!*/
                        id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 ~ 24 사이의 문자 및 숫자<br />
                            대문자와 소문자, 숫자와 특수문자를 포함해야합니다. <br />
                            가능한 특수문자는 다음과 같습니다. <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        


                        <button disabled={!validPwd ? true : false}>회원가입</button> 
                        < GoogleButton/>
                        < NaverButton/>

                    </form>
                    <p>
                        이미 계정이 있으신가요?<br />
                        <span className="line">
                            <Link to="/Login">로그인 하기</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register;
