import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './styles.css'

export default function App() {
  const [data, setData] = useState([])
  const [showLoader, setShowLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/stockList').then(res => res.json()).then(({ list }) => {
      setShowLoader(false)
      setData(list)
    })
    return () => {
      console.log("unmount")
    }
  }, [])

  if (showLoader) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='App'>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Two week avg delivery</th>
            <th>Stock avg delivery</th>
            <th>Show Stock Data</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((stock, index) =>
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.twoWeekAvgDelivery}</td>
                <td>{stock.avgDelivery}</td>
                <td>
                  <button onClick={() => navigate(`/stock/${stock.symbol}`)}>View</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
