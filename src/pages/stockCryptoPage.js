import React from 'react'
import StockCrypto from '../StockSetUp/stockCrypto';
import StockToggle from '../StockSetUp/stockToggle';

export default function CryptoStockPage() {
    return(
        <div>
            <StockToggle> </StockToggle>
            <StockCrypto> </StockCrypto>
        </div>
    );
}