import { useState, useEffect } from "react"
function Dashboard() {
    const minutes = 20*60*1000
    const duration = minutes
    const [time, setTime] = useState(duration)
    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1000)
        }, 1000);
    })
    function formattedTime(time) {
        let total_sec = parseInt(Math.floor(time / 1000))
        let total_min = parseInt(Math.floor(total_sec / 60))
        let total_hour = parseInt(Math.floor(total_min / 60))
        // let total_sec = parseInt(Math.floor(time/1000))

        let seconds = parseInt(total_sec % 60)
        let min = parseInt(total_min % 60)
        let hour = parseInt(total_hour % 24)
        return `${hour}: ${min}: ${seconds}`

    }
    return (
        <>
            <div style={{color:"white"}}>
                {
                    formattedTime(time)
                } </div>
        </>
    )
}
export default Dashboard