const axios = require('axios')
const avgDeliveryOfStocks = require('./avgOfStock.json')
// const timeFrame = 60000 * 5
const config = {
  headers: {
    authority: 'www.nseindia.com',
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'sec-ch-ua': `"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"`,
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': 'Android',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    referer: 'https://www.nseindia.com/report-detail/eq_security',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    cookie:
      `defaultLang=en; _ga=GA1.1.396151639.1675410731; _ga_PJSKY6CFJH=GS1.1.1693545933.179.1.1693546697.60.0.0; _ga_QJZ4447QD3=GS1.1.1705050033.1.1.1705050084.0.0.0; _abck=D790EAFD36CD89DC3EC87CF8E457FC3B~0~YAAQT4ksMTGd4+OQAQAAFd5/6AzMongbOanXgfP14QWa8Rqw8iL7aR/3v0lyv3UTPV0IZ9wfMuQkVr+yST8w4VRTeWJkdUmuchk7go4Xf0XhGdIJLiXoTFdFdlqz3m59PWMI+rFe18sT9+mVUHORo78X6joOJco+TDHA6kmrGcdPhxKNAGS5LX+BDy7MxiDwMuGFpQZuOPhtIRFxWdsZlOB3RXpjjWOAWP7ZPUEW4iL4QhvmwD4x/TERqerYBG/nsOTM7aMVVrZ497B8XqWywDxuSQAo3zOY44oZfI1FLSgXRR4rEgVuHlO8nUZFcTaaXTdNz8nr98+5upqtgjoRB9PwFJVSBBBvIL2zgDiICak1b0bnoooYqpfW/MoiX0z3SMg90uFVWc/Z6kZkYOEPVW+X//oj1wkwqFU=~-1~-1~-1; bm_sz=FAF92D94D2F346E962565BAE540D72A8~YAAQToksMVB80+KQAQAAe7RF6RiCYHiKVbCK8bATakZVI3a/GiE4qEzLclY9H4OrTGP9zqCaM050Cleh5b/q2Hl+O0eGeSGa0MnyiNqLiAghBfiu2TH5m1wiDRVz3zNyy6J6t8Ev64QTZgO0TuFTvyk1QJQVSVvFktFIhDUNOfoQlLfFJHEUPJ7LeLDu9lJ+xFAKutSc/1aQ4z25lUTwpR5v/eL0NVDG4e17fJ3TZOB0iiCnn/jVTIeTUwcmDXstNPqQTefDLpgQgZspCfZVAFfRx9I6hsjyIiR881J0w2Se7u66K0k//j9dgrL1RZCkzb864uqPwXEaG4DrVNATBdNklqDjTzRwZ7rrGmvkeFAMykOglNnwT7Yj2PEq/KMhCj1YHFlEx9gwoby4ZYFhaXsdXRgYfFBUmyyWZOV90kmtS/6tKQ==~3293749~3682616; nsit=oadaHzdpBM3_WAICdz_Q68Vv; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcyMTkwMDk4MiwiZXhwIjoxNzIxOTA4MTgyfQ.VcaGwDxlc2PGX9xaSLC5t_ZO2GHUD4-mkyb0XanIrnU; AKA_A2=A; bm_mi=1B3E8F2DF909361A5BF93C880EBB1527~YAAQJNgsMeDgStqQAQAAheBL6RjlKJEI/JikB1dvtXe5Q/b+/9hCQulSkHpHo77OzBkpmRjq9DkLQ8F1aju5iT/rCBFQz11eM75dNSGlI2vpxAs8x11aEUTO3eIgXcKjWGdTOqvPClZsBLSy3JUPVbFQa7OCKevBVdz7sggbbQPtjlGQs9xt+HNuLmlJaX8O9UC+UP9r1yEjioK8FGRm0NrxXhB/ari0P6nkBWdoQpPhS9EpfdoYGK2a/9FMSSNOXmyuKKnTAbWG82U69rlm3U8Va81f69MwZOSv/4sGMk5AoOyjE4gLeFNQKJbpHOYZ90QBY44O82/WYvqdSRNFdhNZjIF9VlPiCA==~1; _ga_87M7PJ3R97=GS1.1.1721900982.35.1.1721900983.59.0.0; ak_bmsc=DB435AEB716E5A2C3E5C3C0FA2CC016A~000000000000000000000000000000~YAAQJNgsMQbhStqQAQAAeuZL6RgjwE0v4SJNhMvbZIWutmj2U5iQyIxZg8jcFC+XX/VJGDV3lDlhd570ELLfSCl9FDALsvDlT0VoCUQWVMv//ivm6UG/C3qDunrBkyeB2SkrqcEDT1ouVfI5YZ8LV/A5w+6Jn4f9NApMorBJv0qBM6zh5Wcu3EQAEwUPnVh5RtSAv79jOekx9MagZ2sCSJDouX5PepfmyBlQu+OwnqCmjJCnQRPV347yqLMrElkq+Y6GenjrYNJG1sBzRjBYqeTvjXKkcAwUHtNFfY1dHVERuUOuPRxWgJaai5ni7I4eup8YKDVZK1PYeWzY/gPt7M4xL91HD0YdjRQP4XlmY0QUsoSRzOPGplz7ATF4iQ8oZvUy5ULorOpuxtrzs/hdTQJAVRPpHl3f+vDWZ9rAUvS0ME6y7WVqgT9NlCgFZjc6O00EsAtzlqR3uum1RYacttvmvE4vIYipsZm59YcvhaYOpRa8+5qKwRQGlhW+VxEOY7PtNeMXhuB+; RT="z=1&dm=nseindia.com&si=75c4accd-610a-40f5-a0e6-022c975cdc2a&ss=lz0vfcpn&sl=1&se=8c&tt=1ds&bcn=%2F%2F684d0d43.akstat.io%2F&ld=7ylvq"; bm_sv=EA4992720BE12433D45E238A8C3F8B45~YAAQJNgsMZPhStqQAQAAJvVL6RiSSKsnXHr49ruQ3Ye9Xmcun9bJr2j4fZKmk9K/TSdTvtnWUveCqsRCeh+bMg9ZlJbtVUnJ9TPsX5y0eh8k0xqAd805dyB97WDUuxVx6cn6fsNZWVvbVbrjeamOetBS8FxyHeIaTonz9Y0QqKGGMQvIA+FJW2XC4ZzFfdkOWKCIBvbHEfuLTn5c2mDfW+NI5tcfQ0zNDkECiu3EtFx3lxvI7LlTHce9PbVXwif4OXOVwA==~1`
  }
}
const stockList = ['IRB', 'RVNL', 'HDFCBANK', 'SAIL', 'IDEAFORGE', 'OLECTRA', 'HSCL', 'JKTYRE', 'AZAD', 'TVSSCS', 'JSWINFRA', 'JSWENERGY', 'MFSL', 'SBIN', 'TATAMOTORS', 'INDHOTEL', 'KAYNES', 'GAIL', 'COALINDIA', 'POONAWALLA', 'NHPC', 'ASIANPAINT', 'TITAN', 'HINDALCO', 'CUPID', 'HAPPSTMNDS', 'ADANIGREEN', 'PRAJIND', 'WIPRO', 'TATAELXSI', 'CGPOWER', 'PAYTM', 'INFY', 'LT', 'NMDC', 'TATAPOWER', 'IRCON', 'PARAS', 'ASAHIINDIA', 'BSOFT', 'TIINDIA', 'NTPC', 'AFFLE', 'ASHOKLEY', 'TATACONSUM', 'TRIDENT', 'POLYCAB', 'ARE%26M', 'IRFC', 'IDFCFIRSTB', 'UJJIVANSFB', 'MSUMI', 'MOTHERSON', 'NCC', 'GRINFRA', 'PNCINFRA', 'RELIANCE', 'JIOFIN', 'SMCGLOBAL', 'GUJGASLTD', 'EASEMYTRIP', 'ARVIND', 'HINDUNILVR', 'LODHA', 'RAJRATAN', 'BORORENEW', "KOTAKBANK", "NESTLEIND", "TCS", "BAJAJFINSV", 'HCLTECH', 'OMKARCHEM', 'RAINBOW']

function getReport() {
  return new Promise((resolve, reject) => {
    let result = []
    let numberOfThreads = stockList.length
    stockList.forEach(stock => {
      getAvgDeliveryOfStock(stock, 15).then(data => {
        if (data > avgDeliveryOfStocks[stock]) {
          result.push({ symbol: stock, twoWeekAvgDelivery: data, avgDelivery: avgDeliveryOfStocks[stock] })
        }
        numberOfThreads--
      })
    })

    const interval = setInterval(() => {
      if (!numberOfThreads) {
        clearInterval(interval);
        resolve(result.sort((s1, s2) => {
          return (s1.avgDelivery - s1.twoWeekAvgDelivery) - (s2.avgDelivery - s2.twoWeekAvgDelivery)
        }))
      }
    }, 1000)
  })
}

async function getAvgDeliveryOfStock(symbol, daysAgo, monthAgo, yearAgo) {
  let data = await getStocksData(symbol, getFormatedDate(daysAgo, monthAgo, yearAgo), getFormatedDate())
  let total = data.reduce((res, currentDelivery) => {
    if (typeof currentDelivery['COP_DELIV_PERC'] === 'number') {
      res += currentDelivery['COP_DELIV_PERC']
    }
    return res
  }, 0)
  return Math.floor(total / data.length)
}

async function getStockData(symbol) {
  let data = await getStocksData(symbol, getFormatedDate(null, 1), getFormatedDate())
  return data.map(ele => {
    return {
      date: ele['mTIMESTAMP'],
      symbol,
      deliveryPercent: ele['COP_DELIV_PERC'],
      price: ele['VWAP'],
      avgDeliveryPercent: avgDeliveryOfStocks[symbol]
    }
  })
}

module.exports.getReport = getReport
module.exports.getAvgDeliveryOfStock = getAvgDeliveryOfStock
module.exports.getStockData = getStockData
module.exports.stockList = stockList

//--------utils---------
function getFormatedDate(daysAgo, monthAgo, yearAgo) {
  const date = new Date()
  daysAgo && date.setDate(date.getDate() - daysAgo)
  monthAgo && date.setMonth(date.getMonth() - monthAgo)
  yearAgo && date.setFullYear(date.getFullYear() - yearAgo)

  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()

  day = day < 10 ? `0${day}` : day
  month = month < 10 ? `0${month}` : month
  return `${day}-${month}-${year}`
}

function getUrl(symbol, fromDate, toDate) {
  return `https://www.nseindia.com/api/historical/securityArchives?from=${fromDate}&to=${toDate}&symbol=${symbol}&dataType=priceVolumeDeliverable&series=ALL`
}

function getStocksData(symbol, fromDate, toDate) {
  return axios.get(getUrl(symbol, fromDate, toDate), config).then(({ data: { data } = {} }) => {
    return data
  }).catch(err => {
    return err
  })
}