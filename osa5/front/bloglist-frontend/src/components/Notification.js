import React from 'react'

//const Notification = ({ message }, { color }) => {
const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  if(props.color === 'red') {
    return (
      <div className="errorRed">
        {props.message}
      </div>
    )
  }
  else if(props.color === 'green') {
    return (
      <div className="errorGreen">
        {props.message}
      </div>
    )
  }
}

export default Notification