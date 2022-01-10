import React from 'react';
import './Crypto';
import { Line } from 'react-chartjs-2'
import './stockCrypto.css'
// https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-01-2020
//https://api.nomics.com/v1/markets?key=your-key-here



let recentDate = '', prevDate = '';

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

    fetchStock() {
        const pointThis = this;
        let API_Call = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=cad&days=${daysAgo}&interval=daily`;

        let coinPriceY = [];
        let coinDateX = [];

        fetch(API_Call)
            .then(
                function (response) {
                    if(!response.ok) {
                        throw Error(response.statusText);
                    }
                    else {
                        return response.json();
                    }
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
            .catch((error) => {
                console.log(error);
            })
    }

    getDates() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        this.setState({date: new Date().toLocaleString()})

        recentDate = year.toString() + '-' + month.toString() + '-' + date.toString();
        console.log(recentDate)
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        coin = event.target.value;
    }

    handleSubmit(event) {
        console.log(this.state.value);
        coin = this.state.value;
        this.fetchStock();
        event.preventDefault();

    }

    tenDays() {
        daysAgo = 9;
        this.fetchStock();
    }

    month() {
        daysAgo = 30;
        this.fetchStock();
    }

    

    render() {
        return (
            <div>

                <h1 className='coin-text'> Select the Coin You Want to View (bitcoin, ethereum): </h1>
                <br />

                <h1 className="dates"> {daysAgo} days from {recentDate} </h1>
                

                <br /> <br />

                <form onSubmit={this.handleSubmit}>
                    <label className="field field_v1">
                        <input className="field__input" STYLE="color: #ffffff;" placeholder="e.g BTC" value = {coin} onChange={this.handleChange} />
                        <span className="field__label-wrap">
                            <span className="field__label"> Type the Coin </span>
                        </span>

                        <input type="submit" name="go" value="Submit" id="searchSubmit" />
                    </label>
                    <br /> <br />

                </form>

                <button onClick={() => this.tenDays()}> 10 Days </button>
                <button onClick={() => this.month()} > One Month </button>



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
        this.getDates();

        setInterval(this.getDates, 86400000);


    }

};

export default StockCrypto;