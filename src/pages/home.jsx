import Navbar from '../components/Navbar'
import '../css/home.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
function Home() {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
      const apiKeyFromEnv = import.meta.env.VITE_FIREBASE_API_KEY;
      setApiKey(apiKeyFromEnv);
    }, []);
    console.log(apiKey)
  
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