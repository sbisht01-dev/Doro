function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="logo">DORO</div>
                <div className="nav">
                    <a href=""><div>Home</div></a>
                    <a href=""><div>Spotify</div></a>
                    <a href=""><div>Sessions</div></a>
                </div>
                <div className="user"><img src="src/assets/user.png" alt="" /></div>
            </div>
        </>
    )
}

export default Navbar