import { Link } from 'react-router-dom'
import './stockToggle.css'

export default function StockToggle() {
    return (
        <div>
            <Link to='/cryptoPage'>
                <span className = "hoverBtn"> <p className = "btn effect01"> <span> Market</span> </p> </span>
            </Link>

            <Link to='/cryptoStock'>
                <span className = "hoverBtn"> <p className = "btn effect01"> <span> Graphs</span> </p> </span>
            </Link>
        </div>
    );
}
