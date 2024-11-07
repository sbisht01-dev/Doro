import { useState, useEffect } from "react";
import app from "../firebase";
import { onAuthStateChanged } from 'firebase/auth/web-extension'
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import '../css/dashboard.css'
import { getAuth } from "firebase/auth";

function Dashboard() {
    const auth = getAuth(app)
    const [userInput, setUserInput] = useState(10);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [time, setTime] = useState(userInput * 60 * 1000);
    const [tagID, setActiveTag] = useState("")
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            window.localStorage.setItem("uid", user.uid);
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        let intervalId;
        if (isTimerActive && time > 0) {
            intervalId = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
            }, 1000);
        } else if (time === 0) {
            setIsTimerActive(false); // Stop the timer when it reaches zero
        }

        return () => clearInterval(intervalId);
    }, [isTimerActive, time]);

    const handleStartTimer = () => {
        setIsTimerActive(true);
    };

    const handleDurationChange = (event) => {
        const newDuration = parseInt(event.target.value);
        setUserInput(newDuration);
        setTime(newDuration * 60 * 1000); // Update the timer with the new duration
        setIsTimerActive(false); // Reset timer state
    };

    const formattedTime = () => {
        let total_sec = Math.floor(time / 1000);
        let hours = Math.floor(total_sec / 3600);
        let minutes = Math.floor((total_sec % 3600) / 60);
        let seconds = total_sec % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    //updating the tag with new time durations 

    const handleActiveTagValue = (value) => {
        setActiveTag(value)
    }

    useEffect(() => {
        console.log(tagID)
        if (isTimerActive) {
            setInterval(() => {
                
            }, 5000);
        } else {
            console.log("Not Active");
        }
    }, [isTimerActive,tagID]);

    return (
        <>
            <Navbar />
            <Tag timerActive={isTimerActive} activeTag={handleActiveTagValue} />
            <div className="timer-container">
                <div id="timer" style={{ color: "white" }}>{formattedTime()}</div>
                <select name="duration" id="timer-duration" onChange={handleDurationChange}>
                    <option value="">--Choose--</option>
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                </select>
                <button id="timer-btn" onClick={handleStartTimer}>Start Timer</button>
            </div>
        </>
    );
}

export default Dashboard;
