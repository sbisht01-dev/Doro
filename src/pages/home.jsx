import Navbar from '../components/Navbar'
import '../css/home.css'
function Home() {
    return (
        <>
            <div className="container">
                <Navbar />
                <div className="base">
                    <div className="bottom"></div>
                    <div className="main">
                        <div className="text">Start tracking your time today and see
                            the difference</div>
                        <div className='start'>START NOW </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home