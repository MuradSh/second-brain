import React,{ useState, useEffect } from 'react'

const Inputs = (props) => {
    return <input data-number={props.number}
                    onKeyDown={props.onkeydown}
                    onBlur={props.onblur}
                    type={props.type} placeholder={props.placeholder}  className="textfield"
                    id={props.Id} />
}

export default Inputs;
