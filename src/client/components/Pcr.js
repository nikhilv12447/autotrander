import React from 'react'

export default function Pcr ({ pcrData, symbol }) {
  let cls = ''
  let ui = []
  for (let data of pcrData) {
    let putOI = data.put.total.changeinOpenInterest
    let callOI = data.call.total.changeinOpenInterest
    let pcr = (putOI / callOI).toFixed(2)
    cls = pcr >= 1.5 ? 'buy' : pcr < 1.5 && pcr > 0.8 ? 'nut' : 'sell'
    ui.push(
      <tr key={data.time}>
        <td>{data.time}</td>
        <td>{callOI}</td>
        <td>{putOI}</td>
        <td className={cls}>{putOI - callOI}</td>
        <td className={cls}>{pcr}</td>
        <td className={cls}>
          {pcr >= 1.5 ? 'Buy' : pcr < 1.5 && pcr > 0.8 ? 'NUT' : 'Sell'}
        </td>
        <td>{data.niftyUnderlyingValue}</td>
      </tr>
    )
  }
  return (
    <div>
      <h4 className='pcr-heading'>{symbol} PCR Data</h4>
      <table style={{ width: '100%' }}>
        <thead>
          <tr className={cls}>
            <th>Time</th>
            <th>Call (Lot)</th>
            <th>Put (Lot)</th>
            <th>Diff</th>
            <th>PCR</th>
            <th>Signal</th>
            <th>Nifty At</th>
          </tr>
        </thead>
        <tbody>{ui}</tbody>
      </table>
    </div>
  )
}
