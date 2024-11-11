import { useState, useEffect } from "react";
import app from "../firebase";
import { onAuthStateChanged } from 'firebase/auth/web-extension'
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import '../css/dashboard.css'
import { getAuth } from "firebase/auth";

// Main Dashboard component for timer functionality and tag management
function Dashboard() {
    // Initialize Firebase authentication
    const auth = getAuth(app)

    // State management using hooks
    const [userInput, setUserInput] = useState(10);           // Store user's selected duration in minutes
    const [isTimerActive, setIsTimerActive] = useState(false); // Track if timer is running
    const [time, setTime] = useState(userInput * 60 * 1000);  // Convert minutes to milliseconds
    const [tagID, setActiveTag] = useState()
    const [timerbtn, setTimerBtn] = useState("Start")
    // console.log(timerbtn)
    const [resetbtn, setResetBtn] = useState(false);          // Store active tag ID


    // Effect to handle user authentication state
    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            window.localStorage.setItem("uid", user.uid);
        });
        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [auth]);

    // Effect to handle timer countdown
    useEffect(() => {
        let intervalId;
        // Only run timer if it's active and time remaining
        if (isTimerActive && time > 0) {
            intervalId = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
            }, 1000);
        } else if (time === 0) {
            setIsTimerActive(false); // Stop timer when it reaches zero
        }

        // Cleanup interval on component unmount or when timer stops
        return () => clearInterval(intervalId);
    }, [isTimerActive, time]);

    // Handler for starting the timer
    const handleStartTimer = () => {
        if (tagID) {
            setIsTimerActive(true);
            if (!isTimerActive) {
                setTimerBtn("Stop")
                // console.log("Stop")
            } else if (isTimerActive) {
                setIsTimerActive(false)
                setTimerBtn("Start")
                // console.log("Start")
            }
        }else{
            alert("Select a Tag")
        }
    };

    // Handler for duration changes from dropdown
    const handleDurationChange = (event) => {
        const newDuration = parseInt(event.target.value);
        setUserInput(newDuration);
        setTime(newDuration * 60 * 1000); // Convert minutes to milliseconds
        setIsTimerActive(false); // Reset timer state
    };

    // Format time from milliseconds to HH:MM:SS
    const formattedTime = () => {
        let total_sec = Math.floor(time / 1000);
        let hours = Math.floor(total_sec / 3600);
        let minutes = Math.floor((total_sec % 3600) / 60);
        let seconds = total_sec % 60;

        // Pad numbers with leading zeros
        // if (!isTimerActive) {
        //     console.log("Timer Stopped")
        // }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    };

    // Handler for updating active tag value
    const handleActiveTagValue = (value) => {
        setActiveTag(value)
    }

    // Effect to monitor timer and tag activity
    useEffect(() => {
        if (isTimerActive) {
            setInterval(() => {
                // TODO: Add functionality to update tag duration
            }, 5000);
        } else {
            console.log("Not Active");
        }
    }, [isTimerActive, tagID]);



    //Changing button color based on timer activity
    let tBtn = document.getElementById("timer-btn")
    if (tBtn) {

        if (timerbtn === "Start") {
            tBtn.style.backgroundColor = "Green"

        } else if (timerbtn === "Stop") {
            console.log("Button on Stop")
            tBtn.style.backgroundColor = "Red"

        }
    }



    // Render dashboard components
    return (
        <>
            <Navbar />
            <Tag timerActive={isTimerActive} activeTag={handleActiveTagValue} />
            <div className="timer-container">
                {/* Timer display */}
                <div id="timer" style={{ color: "white" }}>{formattedTime()}</div>

                {/* Duration selector dropdown */}
                <select name="duration" id="timer-duration" onChange={handleDurationChange}>
                    <option value="">--Choose--</option>
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                </select>

                {/* Start timer button */}
                <div className="btn-flexbox">
                    <button className="button-27" id="timer-btn" onClick={handleStartTimer}>{timerbtn}</button>
                    <button className="button-27" id="reset-btn" onClick={handleStartTimer}>Reset</button>
                </div>





            </div>
        </>
    );
}

export default Dashboard;