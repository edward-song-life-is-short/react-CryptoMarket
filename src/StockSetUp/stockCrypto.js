import React from 'react';
import './crypto';
import axios from 'axios';
import { Line } from 'react-chartjs-2'
// https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-01-2020
//https://api.nomics.com/v1/markets?key=your-key-here

let stringDate;

let coinPriceY = [];
let coinPriceX = [];

class StockCrypto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xVal: [],
            yVal: [],
        }

        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchStock() {
        const pointThis = this;
        const nomicKey = 'bdc9cfb03b3ce683c9095198ae87dc286bef0d36';
        let API_Call = `https://api.nomics.com/v1/currencies/sparkline?key=${nomicKey}&ids=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z`;

        let coinPriceY = [];
        let coinDateX = [];



        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);
                    console.log(data[0]['prices'].length);

                    for (let i = 0; i < data[0]['prices'].length; i++) {
                        console.log('test');
                        coinPriceY.push(data[0]['prices'][i]);
                        coinDateX.push(data[0]['timestamps'][i]);
                    }


                    pointThis.setState(
                        {
                            xVal: coinDateX,
                            yVal: coinPriceY
                        }
                    );
                }
            )
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>

                <h1 className='coin-text'> Preview Stock at date (e.g 01-01-2020): </h1>
                <h1> {this.state.value} </h1>

                <form>
                    <input type="text" className="coin-input" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>

                <Line
                    data={{
                        labels: this.state.xVal,
                        datasets: [{
                            label: 'BTC',
                            data: this.state.yVal,
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


        );
    }

    componentDidMount() {
        this.fetchStock();
    }

};

export default StockCrypto;