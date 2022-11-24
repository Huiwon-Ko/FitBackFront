import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios' 
/*import GoogleLogin from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google'; */


function GoogleButton(){
    const clientId = '372495721999-tkdujncr3rjq27huenf9en6ja1v48tid.apps.googleusercontent.com';

    
    const onSuccess = async(response) => {
    	console.log(response);
        
        const result = response.profileObj
        const token = response.tokenId

        let body = {
            data: {
                profile: result,
                tokenId: token
            }
        }

        axios.post('/api/google/login', body)
        .then(response =>{
            console.log('구글로그인 성공');
        })
        .catch(err => alert(err))
    }
    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default GoogleButton 

/*
import React, { useCallback, useEffect } from "react";
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = '372495721999-tkdujncr3rjq27huenf9en6ja1v48tid.apps.googleusercontent.com'

const GoogleButton = ({ onSocial }) => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: 'email',
            });
        }

        gapi.load('clent:auth2', start);
    }, []);

    const onSuccess = (response) => {
        console.log(response);
    };

    const onFailure = (response) => {
        console.log(response);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
};

export default GoogleButton; */