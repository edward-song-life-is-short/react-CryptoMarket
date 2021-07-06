import React, { useState, useEffect } from 'react';
import './crypto';
import axios from 'axios';
import Coin from './Coin';

// https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-01-2020

//api link for 100 coins
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false
function Crypto() {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false')

            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            }).catch(error => console.log(error))
    }, []);

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())

    )

    return (
        <div className='coin-app'>

            <div className="coin-search">
                <div className = "coinPosition"> <h1 className='coin-text'> Search currency: </h1> </div>

                <label className="field field_v1">
                    <input className="field__input" STYLE="color: #ffffff;" placeholder="e.g bitcoin" onChange={handleChange} />
                    <span className="field__label-wrap">
                        <span className="field__label"> Type the Coin Name </span>
                    </span>
                </label>

            </div>

            {filteredCoins.map(coin => {
                return (
                    <Coin key={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        marketcap={coin.market_cap}
                        price={coin.current_price}
                        priceChange={coin.price_change_percentage_24h}
                        volume={coin.total_volume}
                    />
                )
            })}
        </div>
    );

}

export default Crypto;