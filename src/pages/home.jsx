import Navbar from '../components/Navbar'
import '../css/home.css'
import { Link } from 'react-router-dom'
function Home() {
   
  
    return (
        <>
            <div className="container">
                <Navbar />
                <div className="base">
                    <div className="bottom"></div>
                    <div className="main">
                        <div className="text">
                            Start tracking your time today and see the difference</div>
                        <Link to="dashboard">
                            <div className='start'>START NOW </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home