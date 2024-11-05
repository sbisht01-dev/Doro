import { useState, useEffect } from "react"
import app from "../firebase";
import { onAuthStateChanged } from 'firebase/auth/web-extension'
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import '../css/dashboard.css'
import { getAuth } from "firebase/auth";
function Dashboard() {
    const auth = getAuth(app)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            window.localStorage.setItem("uid", user.uid)
        })
        return () => unsubscribe();
    }, [auth])

    const [userInput, setUserInput] = useState(10)

    const minutes = userInput * 60 * 1000
    const duration = minutes
    // const navigate = useNavigate();
    function useTimer(initialTime) {
        const [time, setTime] = useState(initialTime);

        useEffect(() => {
            const intervalId = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);

        return time;
    }

    const time = useTimer(duration);

    function formattedTime(time) {
        let total_sec = parseInt(Math.floor(time / 1000))
        let total_min = parseInt(Math.floor(total_sec / 60))
        let total_hour = parseInt(Math.floor(total_min / 60))
        let seconds = parseInt(total_sec % 60)
        let minutes = parseInt(total_min) % 60

        if (minutes < 10 & minutes >= 0) {
            minutes = `0` + `${minutes}`
        }

        if (seconds < 10 & seconds >= 0) {
            seconds = `0` + `${seconds}`
        }

        let hour = parseInt(total_hour % 24)
        if (total_sec <= 0) {
            return '00:00:00'
        }

        return `${hour}: ${minutes}: ${seconds}`
    }

    

    return (
        <>
            <Navbar />
            <div className="timer-container">
                <div id="timer" >
                    <input type="text" name="timer" id="timer" placeholder={formattedTime(time)} />
                </div>
                <Tag />

            </div>
        </>
    )
}
export default Dashboard