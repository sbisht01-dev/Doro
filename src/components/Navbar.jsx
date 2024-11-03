
import { useEffect, useState } from 'react'
import app from '../../firebase'
import { onAuthStateChanged, getAuth } from 'firebase/auth/web-extension'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const auth = getAuth(app);
    const navigate = useNavigate()
    const [user, setUser] = useState(false);
    const [photo, setPhoto] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhoto(user.photoURL)
                setUser(true);
                setName(user.displayName)

            } else {
                navigate("/");
            }
        })
        return () => unsubscribe();
    })
    
    useEffect(() => {
        console.log(name)
    }, [name])

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
                            <img src={photo} />
                        </div>
                        <p style={{ color: "white", textDecoration: "none" }}>{name}</p>
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