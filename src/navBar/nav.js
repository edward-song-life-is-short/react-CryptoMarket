import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './navElements'
import qTrade from '../img/logo.svg'

const Navigation = () => {
    return (
        <>

            <Nav>

                <NavLink to='/'>
                    <img src={qTrade} alt='lsogo' />
                </NavLink>

                <Bars />

                <NavMenu>
                    <NavLink to="/stockPage" activeStyle> Stock </NavLink>
                    <NavLink to="/cryptoPage" activeStyle> Crypto</NavLink>
                </NavMenu>




                <NavBtn>
                    <NavBtnLink to='/log-in'> Sign in</NavBtnLink>
                </NavBtn>

            </Nav>
        </>
    );
}

export default Navigation;