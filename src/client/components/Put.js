import React from 'react'

export default function Call ({ putData, symbol }) {
  function getPutUi () {
    let ui = putData.data.map((ele, index) => (
      <tr
        className={index > 8 ? 'itm' : index === 8 ? 'atm' : ''}
        key={ele.strikePrice}
      >
        <td>{ele.strikePrice}</td>
        <td>{ele.lastPrice}</td>
        <td
          className={
            ele.strikePrice === putData.highestOIStrikePrice ? 'highOI' : ''
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
        <td>{putData.total.openInterest}(Lot)</td>
        <td>{putData.total.changeinOpenInterest}(Lot)</td>
      </tr>
    )
    return ui
  }
  return (
    <div className='put-container'>
      <h4 className='put-heading'>{symbol} PUT Option</h4>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Strike</th>
            <th>LTP</th>
            <th>OI</th>
            <th>Change OI</th>
          </tr>
        </thead>
        <tbody>{getPutUi()}</tbody>
      </table>
    </div>
  )
}
