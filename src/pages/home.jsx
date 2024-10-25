import Navbar from '../components/Navbar'
import '../css/home.css'
import { useEffect, useState } from 'react'
import app from '../../firebase'
import { onAuthStateChanged, getAuth } from 'firebase/auth/web-extension'
import { useNavigate } from 'react-router-dom'
function Home() {
    const auth = getAuth(app);
    const navigate = useNavigate()
  let [photoURL,setPhotoURL] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhotoURL(user.photoURL)
                navigate("dashboard")
            } else {
                navigate("/");
            }
        })
        return () => unsubscribe();
    })
    return (
        <>
            <div className="container">
                <Navbar photoURL={photoURL} />
                <div className="base">
                    <div className="bottom"></div>
                    <div className="main">
                        <div className="text">Start tracking your time today and see
                            the difference</div>
                        <div className='start'>START NOW </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home