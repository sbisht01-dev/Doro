import { Link } from 'react-router-dom'

function Navbar() {

    console.log("Git working")
    return (
        <>
            <div className="navbar">
                <div className="logo">DORO</div>
                <div className="nav">
                    <a href=""><div>Home</div></a>
                    <a href=""><div>Spotify</div></a>
                    <a href=""><div>Sessions</div></a>
                </div>
                <Link to={"login"} >
                    <div className="user">
                        <img src="src/assets/user.png" alt="" />
                    </div>
                </Link>
            </div>
        </>

    )
}

export default Navbar