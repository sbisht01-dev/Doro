import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
// import Spotify from 'spotify-web-playback-sdk';
// import axios from "axios"
function Songs() {
    const clientID = "208d71a77a2945b3935fda8940158ff3"
    const redirectURL = "http://localhost:5173/songs"
    const authEndPoint = "https://accounts.spotify.com/authorize"
    const responseType = "token"
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const [token, setToken] = useState("")
    // console.log(token)
    // const [searchKey, setSearchKey] = useState("")
    // const [artists, setArtists] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }


    // const searchArtists = async (e) => {
    //     e.preventDefault()
    //     const { data } = await axios.get("https://api.spotify.com/v1/search", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //         params: {
    //             q: searchKey,
    //             type: "artist"
    //         }
    //     })

    //     setArtists(data.artists.items)
    // }

    // const renderArtists = () => {
    //     return artists.map(artist => (
    //         <div key={artist.id}>
    //             {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
    //             {artist.name}
    //         </div>
    //     ))
    // }



    // if (token) {
    //     window.onSpotifyWebPlaybackSDKReady = () => {
    //         let token = `${token}`;
    //         const player = new Spotify.Player({
    //             name: 'Web Playback SDK Quick Start Player',
    //             getOAuthToken: cb => { cb(token); },
    //             volume: 0.5
    //         });

    //         // Ready
    //         player.addListener('ready', ({ device_id }) => {
    //             console.log('Ready with Device ID', device_id);
    //         });

    //         // Not Ready
    //         player.addListener('not_ready', ({ device_id }) => {
    //             console.log('Device ID has gone offline', device_id);
    //         });

    //         player.addListener('initialization_error', ({ message }) => {
    //             console.error(message);
    //         });

    //         player.addListener('authentication_error', ({ message }) => {
    //             console.error(message);
    //         });

    //         player.addListener('account_error', ({ message }) => {
    //             console.error(message);
    //         });

    //         document.getElementById('togglePlay').onclick = function () {
    //             player.togglePlay();
    //         };

    //         player.connect();
    //     }
    // }

    return (
        <>
            <Navbar />
            {!token ? (<a href={`${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=${responseType}&state=${state}`}>
                <button
                    style={{
                        backgroundColor: "white",
                        borderRadius: 18,
                        height: 50,
                        width: 120
                    }}>
                    Spotify
                </button>

            </a>) : (<button
                onClick={logout}
                style={{
                    backgroundColor: "lightgreen",
                    borderRadius: 18,
                    height: 50,
                    width: 120
                }}>
                Logout
            </button>)}
            {/* {token ?
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>

                : <h2>Please login</h2>
            } */}

            {/* {renderArtists()} */}

            {token ? (<button
                style={{
                    backgroundColor: "lightblue",
                    borderRadius: 18,
                    height: 50,
                    width: 120
                }}
                id="togglePlay">Toggle Play</button>
            ) : null}


        </>
    )
}
export default Songs;