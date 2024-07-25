const { getStockData, getReport, getAvgDeliveryOfStock, stockList } = require('./nseOptionChainLogic.cjs')
const path = require('path')
const { writeFile } = require('fs')
// const {
//   getNSEOptionChain,
//   updateNSEOptionChain,
//   onNSEOptionChainUpdate
// } = require('./firebaseUtils')

// getNSEOptionChain().then(nseOptionChainFromDb => {
//   startLogic(updateNSEOptionChain, nseOptionChainFromDb)
// })

const http = require('http')
const express = require('express')
// const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('/stockList', (req, res) => {
  getReport().then(data => {
    res.status(200).json({ list: data })
  })
})

app.get('/stockAvg/:symbol', (req, res) => {
  const { symbol } = req.params
  getAvgDeliveryOfStock(symbol, null, null, 1).then(data => {
    res.status(200).json({ avg: data })
  }).catch(() => {
    res.send("something wrong happen")
  })
})

app.get('/generateStocksAvgDeliveryData', (req, res) => {
  let stocksAvgDeliveryMap = {}
  stockList.forEach((stock) => {
    stocksAvgDeliveryMap[stock] = getAvgDeliveryOfStock(stock, null, null, 1).then(data => { stocksAvgDeliveryMap[stock] = data })
  })
  let interval = setInterval(() => {
    let shouldWait = true
    for (let key in stocksAvgDeliveryMap) {
      if (stocksAvgDeliveryMap[key] instanceof Promise) {
        shouldWait = true
        break
      } else {
        shouldWait = false
      }
    }
    if (!shouldWait) {
      clearInterval(interval)
      writeFile(path.resolve(__dirname, 'avgOfStock.json'), JSON.stringify(stocksAvgDeliveryMap), 'utf8', () => {
        res.status(200).send("File write Successfully")
      });
    }
  }, 1000)
})

app.get("/stocks/:symbol", (req, res) => {
  const { symbol } = req.params
  getStockData(symbol).then(data => {
    res.json({ data })
  }).catch(() => {
    res.send("something wrong happen")
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

server.listen(1337, function () {
  console.log('Server running')
})

// const wss = new WebSocket.Server({ server })
// let isWssConnect = false
// wss.on('connection', function (ws) {
//   isWssConnect = true

//   ws.on('message', function () {
//     getNSEOptionChain().then(nseOptionChainFromDb => {
//       ws.send(JSON.stringify(nseOptionChainFromDb))
//     })
//   })
//   onNSEOptionChainUpdate(snapshot => {
//     if (isWssConnect) {
//       ws.send(JSON.stringify(snapshot.data()))
//     }
//   })
// })
