import React from 'react';
import "./button.css";


import ReactDOM from 'react-dom';
const myfirstelement = <h1>Hello React!</h1>

ReactDOM.render(myfirstelement, document.getElementById('headers'));

class Button extends React.Component {
    
    render() {   
        return (
           <div className = "container">

            <button onClick = {this.props.onClick} className = "btn-grad"> {this.props.stock} </button>
             
          </div>
          
        );
    }
};

export default Button;