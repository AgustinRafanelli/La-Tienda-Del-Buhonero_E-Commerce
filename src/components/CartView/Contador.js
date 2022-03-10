import React from "react"
import { useState, useReducer } from "react"

const initialState = {count:1}


function reducer(state, action){
    switch (action.type) {
        case "INCREMENT":
            return {count:state.count +1}
            case "DECREMENT":
                return {count:state.count -1}
        default:
            return state;
    }
};



const Contador = ()=>{
    //count [count, setCount] = useState(1)
    const [state, dispatch] = useReducer(reducer, initialState)

    //const sum = ()=> setCount(count  +1);
    const sum = ()=> dispatch({type:"INCREMENT"});

    //const rest = ()=> setCount(count  -1);
    const rest = ()=> dispatch({type:"DECREMENT"});


    return(
        <div>
            <h2>Contador</h2>
            <nav>
                <button onClick= {sum}> + </button>
                <button onClick= {rest}> - </button>
            </nav>
            <h3> {state.count} </h3>
        </div>
    )
}

export default Contador;