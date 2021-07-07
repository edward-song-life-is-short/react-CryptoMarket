import React from 'react';
import './Crypto';
import { Line } from 'react-chartjs-2'
import './stockCrypto.css'
// https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-01-2020
//https://api.nomics.com/v1/markets?key=your-key-here

let recentDate = '', prevDate = '';

let month, day, year;

let daysAgo = 9, coin;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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

        coin = 'bitcoin';
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

    // let API_Call = `https://api.nomics.com/v1/currencies/sparkline?key=${nomicKey}&ids=${coinSymbol}&start=${prevDate}T00%3A00%3A00Z&end=${recentDate}T00%3A00%3A00Z`;

    fetchStock() {
        const pointThis = this;
        let API_Call = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=cad&days=${daysAgo}&interval=daily`;

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

                    console.log(data);


                    for (let i = 0; i <= daysAgo; i++) {
                        coinPriceY.push(data.prices[i][1]);
                        coinDateX.push(data.market_caps[i][0]);
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
        console.log(this.state.value);
        coin = this.state.value;
        this.fetchStock();
        event.preventDefault();

    }

    render() {
        return (
            <div>

                <h1 className='coin-text'> Select the Coin You Want to View (BTC, ETH): </h1>
                <br />
                
                <h1 className = "dates"> {recentDate} : {prevDate} </h1>

                <br /> <br />
               
                <form onSubmit={this.handleSubmit}>
                    <label className="field field_v1">
                    <input className="field__input" STYLE="color: #ffffff;" placeholder="e.g BTC"value={this.state.value} onChange={this.handleChange} />
                    <span className="field__label-wrap">
                        <span className="field__label"> Type the Coin </span>
                    </span>

                    <input type="submit" name="go" value="Submit" id = "searchSubmit"/>
                </label>
                <br /> <br />

                </form>

                <button onClick={() => this.tenDays()}> 10 Days </button>
                <button onClick={() => this.getDate()} > One Month </button>



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