import React from 'react';
import "./button.css";

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