import React from 'react'

export default function Call ({ callData, symbol }) {
  function getCallUi () {
    let ui = callData.data.map((ele, index) => (
      <tr
        className={index < 8 ? 'itm' : index === 8 ? 'atm' : ''}
        key={ele.strikePrice}
      >
        <td>{ele.strikePrice}</td>
        <td>{ele.lastPrice}</td>
        <td
          className={
            ele.strikePrice === callData.highestOIStrikePrice ? 'highOI' : ''
          }
        >
          {ele.openInterest}
        </td>
        <td>{ele.changeinOpenInterest}</td>
      </tr>
    ))
    ui.push(
      <tr className='total' key='total'>
        <td>Total</td>
        <td></td>
        <td>{callData.total.openInterest}(Lot)</td>
        <td>{callData.total.changeinOpenInterest}(Lot)</td>
      </tr>
    )
    return ui
  }
  return (
    <div className='call-container'>
      <h4 className='call-heading'>{symbol} CALL Option</h4>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Strike</th>
            <th>LTP</th>
            <th>OI</th>
            <th>Change OI</th>
          </tr>
        </thead>
        <tbody>{getCallUi()}</tbody>
      </table>
    </div>
  )
}
