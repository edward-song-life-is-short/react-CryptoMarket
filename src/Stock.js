import React from 'react';
import "./Stock.css"

import { Line } from 'react-chartjs-2'

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockChartX2: [],
            stockChartY2: []
        }
    }

    componentDidMount() {
        this.fetchStock();
        this.fetchStock2();
    }

    fetchStock() {
        console.log('runnnin2')
        
        let StockSymbol = 'TSLA';
        const pointThis = this;
        const API_KEY = 'EHM4W2PU9UBUEZZ2';


        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        
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
                    let counter = 0;
                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                        
                        counter++;

                        if (counter > 20) {
                            break;
                        }

                    }

                    pointThis.setState(
                        {
                            stockChartXValues: stockChartXValuesFunction,
                            stockChartYValues: stockChartYValuesFunction
                        }
                    );
                    
                    //console.log(stockChartXValuesFunction);
                }
            )
            

    }
    
    fetchStock2() {
        console.log('running');
        let StockSymbol2 = 'MSFT';
        const pointThis = this;
        const API_KEY = 'EHM4W2PU9UBUEZZ2';


        let API_Call2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol2}&outputsize=compact&apikey=${API_KEY}`;
        
        let stockChartX2ValuesFunction = [];
        let stockChartY2ValuesFunction = [];

        fetch(API_Call2)
            
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log('hello');
                    let counter = 0;
                    for (var key in data['Time Series (Daily)']) {
                        stockChartX2ValuesFunction.push(key);
                        stockChartY2ValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                        
                        counter++;

                        if (counter > 20) {
                            break;
                        }

                    }

                    pointThis.setState(
                        {
                            stockChartX2: stockChartX2ValuesFunction,
                            stockChartY2: stockChartY2ValuesFunction
                        }
                    );
                    
                    //console.log(stockChartXValuesFunction);
                }
            )
            

    }

//this.state.stockChartYValues
//this.state.stockChartY2

    render() {
        return (
            <div> Stock

                <Line
                    data={{
                        labels: this.state.stockChartXValues,
                        datasets: [{
                            label: 'StockSymbol',
                            data:this.state.stockChartYValues,
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
                        },
                        {
                            label: 'StockSgymbol',
                            data: this.state.stockChartY2,
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

                        }
                        ]
                    }}
                    
                    height = {1080}
                    width = {1920}

                    options={{
                        responsive: false,
                        
                    }}

                />


            </div>
        )
    }
}


export default Stock;