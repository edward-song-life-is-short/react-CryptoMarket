import React from 'react';
import './crypto';
import axios from 'axios';
import { Line } from 'react-chartjs-2'
import { findAllInRenderedTree } from 'react-dom/test-utils';
// https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-01-2020
//https://api.nomics.com/v1/markets?key=your-key-here

let recentDate = '', prevDate = '';

let month, day, year;
let setMonth, setDay, setYear;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let coinSymbol = '';
class StockCrypto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xVal: [],
            yVal: [],
            date: new Date().toLocaleString(),
            value: '',
            ten: false
        }

        coinSymbol = 'BTC';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    getDate() {
        var date = new Date().toDateString();

        this.setState({ date: date });

        month = new Date().getMonth() + 1;
        day = new Date().getUTCDate()

        let prevMonth = 0;

        month === 1 ? prevMonth = 12 : prevMonth = month - 1;

        day = day < 10 ? '0' + day.toString() : day.toString();
        month = month < 10 ? '0' + month.toString() : month.toString();

        year = new Date().getFullYear().toString();


        recentDate = year + '-' + month + '-' + day;

        prevMonth = prevMonth < 10 ? '0' + prevMonth.toString() : prevMonth.toString();
        prevDate = year + '-' + prevMonth + '-' + day;
        this.fetchStock();
    }

    fetchStock() {
        const pointThis = this;
        const nomicKey = 'bdc9cfb03b3ce683c9095198ae87dc286bef0d36';
        let API_Call = `https://api.nomics.com/v1/currencies/sparkline?key=${nomicKey}&ids=${coinSymbol}&start=${prevDate}T00%3A00%3A00Z&end=${recentDate}T00%3A00%3A00Z`;
       
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
                    coinPriceY = [];
                    coinDateX = [];

                    console.log(this);
        
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

    tenDays() {
        var dates = new Date();

        dates.setDate(dates.getDate() - 10);
        
        let stringDates = dates.toString();
       
        setMonth = stringDates.substring(4, 7);
        setDay = stringDates.substring(8, 10);
        setYear = stringDates.substring(11, 15)
        
        console.log('run');
        let monthIndex = months.findIndex(element => element === setMonth) + 1;
        
        let strMonth;

        monthIndex >= 10 ? strMonth = monthIndex.toString() : strMonth = '0' + monthIndex.toString(); 

        prevDate = setYear + '-' + strMonth + '-' + setDay;
        console.log(prevDate);
        this.fetchStock();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        console.log(this.state.value);
        coinSymbol = this.state.value;
        this.fetchStock();
        event.preventDefault();

    }

    render() {
        return (
            <div>

                <h1 className='coin-text'> Select the Coin You Want to View (BTC, ETH): </h1>
                <h1> {this.state.value} </h1>
                <h1> {recentDate} </h1>
                <h1> {prevDate} </h1>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="coin-input" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" defaultValue="Reset" />
                </form>
               
                <button onClick = {() => this.tenDays()}> 10 Days </button>
                <button onClick = {() => this.getDate()} > One Month </button>

                

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
        this.getDate();
        this.fetchStock();
    }

};

export default StockCrypto;