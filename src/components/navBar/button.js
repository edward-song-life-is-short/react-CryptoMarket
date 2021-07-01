import './button.css'
import {Link} from 'react-router-dom'

export function Button() {
    return(
        <Link to='/login'>
            <button className = 'buttonBoi'> Log in </button>
        </Link>
    );
}