// import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect } from "react"
import { inject } from '@vercel/analytics';
 
// import app from "../../firebase";
// import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Dashboard() {
    // const auth = getAuth(app)

inject();
    const [userInput, setUserInput] = useState(10)
    const minutes = userInput * 60 * 1000
    const duration = minutes
    // const navigate = useNavigate();
    const [time, setTime] = useState(duration)
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (time > 0) {
                setTime(time - 1000);
            } else {
                clearInterval(intervalId); // Clear the interval when time reaches 0
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [time]);

    // const handleSignOut = () => {
    //     signOut(auth).then(() => {
    //         console.log("Signout")
    //         navigate("/")
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    function formattedTime(time) {
        let total_sec = parseInt(Math.floor(time / 1000))
        let total_min = parseInt(Math.floor(total_sec / 60))
        let total_hour = parseInt(Math.floor(total_min / 60))
        let seconds = parseInt(total_sec % 60)
        let minutes = parseInt(total_min) % 60

        if (minutes < 10 & minutes >=0) {
            minutes = `0`+`${minutes}`
        }

        if (seconds < 10 & seconds >=0) {
            seconds = `0`+`${seconds}`
        }

        let min = parseInt(total_min % 60)
        let hour = parseInt(total_hour % 24)
        if (total_sec <= 0) {
            return '00:00:00'
        }
        // console.log(total_sec)
        return `${hour}: ${minutes}: ${seconds}`

    }
   


    return (
        <>
            <Navbar />
            <div id="timer" >
                <input type="text" name="timer" id="timer" placeholder={formattedTime(time)} />
            </div>
            {/* <input
                onChange={(e) => { setUserInput(e.target.value) }}
                value={userInput}
                type="number"
            /> */}

            {/* <button style={{ backgroundColor: "white", padding: 12, borderRadius: 12 }} onClick={startTimer}>Start</button> */}
            


        </>
    )
}
export default Dashboard