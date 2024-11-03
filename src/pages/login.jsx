import '../css/login.css'
import app from '../../firebase'
// import { useState } from 'react'
import {
    getAuth, GoogleAuthProvider,
    signInWithPopup, 
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate();
    const auth = getAuth(app)
    // const [userUID, setUserUID] = useState("");
    // const [userMail, setUserMail] = useState("");


    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(() => {
            navigate("/")
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleGuestLogin = () => {

    }

    return (
        <>
            <button className='login' id='google-login' onClick={handleGoogleLogin}>Google Login</button>

            <button className='login' id='guest-login' onClick={handleGuestLogin}>Guest Login</button>
        </>
    )
}

export default Login;