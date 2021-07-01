import './button.css'
import {Link} from 'react-router-dom'

export function Button() {
    return(
        <Link to='log-in'>
            <button className = 'buttonBoi'> Log in </button>
        </Link>
    );
}