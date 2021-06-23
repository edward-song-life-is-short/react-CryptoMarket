import React from 'react'
import './timer.css'

class Timers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), stock: {}};
    }

    render() {
        return(
            <div> <h1> {this.state.date.toLocaleTimeString()} </h1> </div>
        );
    }

    componentDidMount() {
        const oneSecond = 1000;
        setInterval(() => {
          this.setState({ date: new Date() });
        }, oneSecond);
      }

      componentWillUnmount(){
        clearInterval(this.intervalID);
      }
}

export default Timers;

