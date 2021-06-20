import React from 'react';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }
    
    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const API_KEY = 'EHM4W2PU9UBUEZZ2';
        
        let StockSymbol = 'FB';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    
        fetch(API_Call)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);
                }
            )
    }

    render() {
        return (
            <div> Stock </div>
        )
    }
}

export default Stock;