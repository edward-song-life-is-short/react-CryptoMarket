import React, { useState } from 'react';
import { Button } from './button'
import './nav.css'
import Drop from './drop'
import { Link } from 'react-router-dom'

function Navigation() {
    const [click, setClick] = useState(false);
    const [drop, setDrop] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if(window.innerWidth < 960) {
            setDrop(false);
        } else {
            setDrop(true);
        }
    };

    const onMouseLeave = () => {
        if(window.innerWidth < 960) {
            setDrop(false);
        } else {
            setDrop(false);
        }
    };
    

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick = {closeMobileMenu}>
                    Logo
                    <i class='fab fa-firstdraft' />
                </Link>

                <div className='main-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}> </i>
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item' >
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/cryptoPage' className='nav-links' onClick={closeMobileMenu}>
                            Crypto
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/stockPage' className='nav-links' onClick={closeMobileMenu}>
                            Stock
                        </Link>
                    </li>

                    <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave = {onMouseLeave}>
                        <Link to='/account' className='nav-links' onClick={closeMobileMenu}>
                            Account 
                            <i className='fas fa-caret-down' /> 
                        </Link>

                        {drop && <Drop />}
                    </li>

                    <li className='nav-item'>
                        <Link to='/contact-me' className='nav-links' onClick={closeMobileMenu}>
                            Contact Me
                        </Link>
                    </li>
                </ul>
                <Button />
            </nav>


        </>
    );
}

export default Navigation;