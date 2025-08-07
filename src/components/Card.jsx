import React from 'react'

export default function Card() {

    const style = {
        container: {
            color: 'red',
            backgroundColor: 'blue',
        }, 
        font: {
            color: 'white',
        } 
    }; 

    return (
        <div style={style.container}>
            <p style={style.font}>Card</p> 
        </div>
    );
}