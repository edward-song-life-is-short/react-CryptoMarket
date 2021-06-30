import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './navElements'


const Navigation = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/stockPage" activeStyle> Stock </NavLink>
                    <NavLink to="/cryptoPage" activeStyle> Crypto</NavLink>
                </NavMenu>
            

            <Bars />

            <NavBtn>
                <NavBtnLink to = '/log-in'> Sign in</NavBtnLink>
            </NavBtn>

            </Nav>
        </>
    );
}

export default Navigation;