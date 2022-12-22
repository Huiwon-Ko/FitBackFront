import { createContext, useState } from "react"; /*Context를 이용해서 전역에서 props를 공유하는 내용입니다.
Context를 사용해서 인증 여부에 따라 로그인/비로그인 화면을 나눌수도 있다고 들었으나 그건 서버 연결 후 
백엔드 분들의 도움이 필요해 구현하지 못했습니다. */

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;