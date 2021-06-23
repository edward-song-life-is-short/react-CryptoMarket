import React from 'react';
import "./button.css";


import ReactDOM from 'react-dom';
const myfirstelement = <h1>Hello React!</h1>

ReactDOM.render(myfirstelement, document.getElementById('headers'));

class Button extends React.Component {
    render() {
        
        return (
           <div>

            <button onClick = {this.props.onClick} > Button </button>
             
          </div>
          
        );
    }
};

export default Button;