import React, { useState } from 'react';
import { CryptoItems } from './cryptoItems'
import './drop.css'
import { Link } from 'react-router-dom'

function CryptoDrop(props) {
    const [click, setClick] = useState(false)
 
    return(
        <> 
            <ul onClick={props.onCloseMobileMenu}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
                {CryptoItems.map((item, index) =>  {
                    return(
                        <li key = {index}>
                            <Link className = {item.cName} to = {item.path}> 
                                {item.title} 

                            </Link>
                        </li>
                    );
                })}
            </ul> 
        </>
    );
}

export default CryptoDrop;

