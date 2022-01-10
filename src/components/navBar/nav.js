import React, { useState } from 'react';
import { Button } from './button'
import './nav.css'
import Drop from './drop'
import { Link } from 'react-router-dom'

import { Dropdown } from 'react-bootstrap';

function Navigation() {
    const [click, setClick] = useState(false);
    const [drop, setDrop] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const extendElement = () => {
        drop ? setDrop(false) : setDrop(true);
    }

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDrop(false);
        } else {
            setDrop(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDrop(false);
        } else {
            setDrop(false);
            console.log(drop);
        }
    };


    return (
        <>
            <nav className='navbar'>

                <menu></menu>

                {/* <Dropdown>
                    <Dropdown.Toggle
                        variant="secondary btn-sm"
                        id="dropdown-basic">
                        Language
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ backgroundColor: '#73a47' }}>
                        <Dropdown.Item href="#" >Arabic</Dropdown.Item>
                        <Dropdown.Item href="#">English</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}

                {/* <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    Logo
                    <i className='fab fa-firstdraft' />
                </Link> */}

                {/* <div className='main-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}> </i>
                </div> */}

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item' >
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            <p className="hover-underline-animation"> Crypto </p>
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/cryptoPage' className='nav-links' onClick={closeMobileMenu}>
                            <p className="hover-underline-animation"> Graphs </p>
                        </Link>
                    </li>

                    {/* <li className='nav-item'>
                        <Link to='/stockPage' className='nav-links' onClick={closeMobileMenu}>
                            <p className="hover-underline-animation"> Stock </p>
                        </Link>
                    </li> */}

                    {/* <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Link to='/account' className='nav-links' onClick={extendElement} >
                            <p className="hover-underline-animation"> Account

                                <i className='fas fa-caret-down' />

                            </p>



                        </Link>

                        {drop && <Drop onCloseMobileMenu={closeMobileMenu} />}
                    </li> */}

                    {/* <li className='nav-item'>
                        <Link to='/contact-me' className='nav-links' onClick={closeMobileMenu}>
                            <p className="hover-underline-animation"> Contact Me </p>
                        </Link>
                    </li> */}

                    {/* <li>
                        <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li> */}
                </ul>
                <Button />


            </nav>


        </>
    );
}

export default Navigation;