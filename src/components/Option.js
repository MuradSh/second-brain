import React from 'react'

const Option = ({text,changePage,showing}) => {

  const headingStyle = {
    background: '#e7cac2',
    boxShadow: '3px 0px 5px darkgray'
  }
  
  return (
    <div style={
        (text==showing) ? headingStyle : null
    } onClick={changePage} className="option">{text}</div>
  )
}



export default Option
