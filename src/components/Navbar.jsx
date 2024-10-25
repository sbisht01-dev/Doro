
import { useEffect, useState } from 'react'
import app from '../../firebase'
import { onAuthStateChanged, getAuth } from 'firebase/auth/web-extension'
import { useNavigate } from 'react-router-dom'

function Navbar(photoURL) {
    console.log(photoURL.photoURL)
    const auth = getAuth(app);
    const navigate = useNavigate()
    const [user, setUser] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // setPhotoURL(user.photoURL)
                setUser(true);
            } else {
                navigate("/");
            }
        })
        return () => unsubscribe();
    })
    return (
        <>
            <div className="navbar">
                <div className="logo">DORO</div>
                <div className="nav">
                    <a href="/ "><div>Home</div></a>
                    <a href="/songs"><div>Spotify</div></a>
                    <a href=""><div>Sessions</div></a>
                </div>
                ({user ?
                    (<a href="/login" >
                        <div className="user">
                            <img src={photoURL.photoURL} />
                        </div>
                    </a>) : (<a href="/login" >
                        <div className="user">
                            <img src="src/assets/user.png" />
                        </div>
                    </a>)
                })
            </div>
        </>

    )
}

export default Navbar