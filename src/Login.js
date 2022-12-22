import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import { Link } from "react-router-dom"
import GoogleButton from './components/GoogleButton';
import NaverButton from './components/NaverButton';
import './css/Login_Register.css';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const baseUrl = "http://localhost:8080"; //수정한 부분(baseURL)

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');  //총 4개의 변수입니다
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(baseUrl+ LOGIN_URL+ "/login", //여기 post뒤에 해당 내용을 post 할 링크를 넣습니다  
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response'); //각 상황에 따른 오류
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>로그인 되었습니다</h1>
                    <br /*(아래) 로그인 성공 후 이동할 페이지 입니다. 현재는 홈 화면으로 설정해두었습니다. */ />
                    <p>
                        <a href="#">Home</a>  
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>로그인</h1> 
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">ID</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">PW</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button>로그인</button>
                    </form>
                    <p>
                        아직 계정이 없으신가요?<br />
                        <span className="line"> 
                            <Link to="/Register">회원가입 하기</Link>
                        </span>
                    </p>
                    < GoogleButton /*구글 로그인 페이지로 이동합니다.*//>
                    < NaverButton /*네이버 로그인 페이지로 이동합니다.*//>
                </section>
            )}
        </>
    )
}

export default Login;
