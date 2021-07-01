import React from 'react';
import './crypto';

import { Line } from 'react-chartjs-2';

const request = require('request');

const options = {
  method: 'POST',
  url: 'https://community-coinbase.p.rapidapi.com/',
  qs: {api_key: 'undefined'},
  headers: {
    'x-rapidapi-key': 'd55e99fce5msh4da44a63e54bfc6p1a1e68jsnc97bf1830acb',
    'x-rapidapi-host': 'community-coinbase.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

class Crypto extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockChartX2: [],
            stockChartY2: [],
        }
    }

    fetchStock() {
        const pointThis = this;
        const API_KEY = '9b58fd5a-f81e-4b2d-84e8-4b68eeeae5d2';
        let stockSymbol = 'MSFT';

        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    pointThis.setState(
                        {
                            stockChartXValues: stockChartXValuesFunction.reverse(),
                            stockChartYValues: stockChartYValuesFunction.reverse()
                        }
                    );

                    //console.log(stockChartXValuesFunction);
                }
            )

    }

    render() {
        return (

            <div id="stockGraph">
                <h1> Test</h1>

                <Line
                    data={{
                        labels: this.state.stockChartXValues,
                        datasets: [{
                            label: 'test',
                            data: this.state.stockChartYValues,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}

                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        boxHeight: 200

                    }}

                />

            </div>

        )
    }

    componentDidMount() {
        this.fetchStock();
        //this.fetchStock2();
        //this.setStock();
    }
}

export default Crypto;