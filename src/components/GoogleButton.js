import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = "372495721999-tkdujncr3rjq27huenf9en6ja1v48tid.apps.googleusercontent.com"; //client 아이디입니다. 

export default function GoogleButton({ onSocial }){
    const onSuccess = async(response) => {
    	console.log(response);
    
        const { googleId, profileObj : { email, name } } = response; 
        
        await onSocial({
            socialId : googleId,
            socialType : 'google',
            email,
            nickname : name 
        });
    }

    const onFailure = (error) => {
        console.log(error); //에러 발생 시 
    }

    return(
        <div>
            <GoogleLogin
                buttonText="Google아이디로 로그인"
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
        </div>
    )
} 