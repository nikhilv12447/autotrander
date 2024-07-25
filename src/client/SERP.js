import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './styles.css'

export default function SERP() {
    const { symbol } = useParams()
    const [data, setData] = useState([])
    const [showLoader, setShowLoader] = useState(true)
    useEffect(() => {
        fetch(`/stocks/${symbol}`).then(res => res.json()).then(({ data }) => {
            setShowLoader(false)
            setData(data)
        })
    }, [])
    if (showLoader) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='App'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Symbol</th>
                        <th>price</th>
                        <th>Delivery Percent</th>
                        <th>Avg Delivery Percent</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((stock, index) =>
                            <tr key={index}>
                                <td>{stock.date}</td>
                                <td>{stock.symbol}</td>
                                <td>{stock.price}</td>
                                <td>{stock.deliveryPercent}</td>
                                <td>{stock.avgDeliveryPercent}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}