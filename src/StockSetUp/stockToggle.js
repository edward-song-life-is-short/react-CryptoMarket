import { Link } from 'react-router-dom'

export default function StockToggle() {
    return (
        <div>
            <Link to='/cryptoPage'>
                <button> Coin Search </button>
            </Link>

            <Link to='/cryptoStock'>
                <button> Coin Stock </button>
            </Link>
        </div>
    );
}
