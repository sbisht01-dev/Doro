import '../css/login.css'
import app from '../../firebase'
import { useState, useEffect } from 'react'
import {
    getAuth, GoogleAuthProvider,
    signInWithPopup, onAuthStateChanged
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate();
    const auth = getAuth(app)
    const [userUID, setUserUID] = useState("");
    const [userMail, setUserMail] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);

            } else {
                navigate("/");
            }
        })
        return () => unsubscribe();
    })

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((user) => {
            setUserMail(user.email);
            setUserUID(user.uid);
            console.log(userUID, userMail)
            console.log(user)
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