import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()

//Array for the week days
// const week = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ]
//Fetch 24 hour data
export const ChartDataTwentyFour = async (coin) => {
  const data = await CoinGeckoClient.coins
    .fetchMarketChart(coin)
    .then((data) => {
        console.log('chart data::',data.data.prices)
      let price = data.data.prices
      let formatedData = []
      for (let i = 0; i < price.length; i++) {
        let date = new Date(price[i][0])
        let hour = date.getHours()
        let min = date.getMinutes()
        let time = `${hour}:${min}`
        formatedData.push({ x: time, y: price[i][1] })
      }
      //   console.log(formatedData)
      return formatedData
    })
    .catch(err=>{
      console.log("Error while fetching coin data")
    })

  return data
}
//Fetch one week data
export const ChartDataOneWeek = async (coin) => {
  const data = await CoinGeckoClient.coins
    .fetchMarketChart(coin, { days: 7 })
    .then((data) => {
      // console.log(data.data.prices)
      let price = data.data.prices
      let formatedData = []
      for (let i = 0; i < price.length; i++) {
        let date = new Date(price[i][0])
        let hour = date.toLocaleDateString()
        hour = hour.split('/').join('-')
        let min = date.toLocaleTimeString()
        let time = `${hour} ${min}`
        formatedData.push({ x: time, y: price[i][1] })
      }
      // console.log(formatedData)
      return formatedData
    })
    .catch(err=>{
      console.log("Error while fetching coin data")
    })

  return data
}
//Fetch one month data
export const ChartDataOneMonth = async (coin) => {
  const data = await CoinGeckoClient.coins
    .fetchMarketChart(coin, { days: 30 })
    .then((data) => {
      // console.log(data.data.prices)
      let price = data.data.prices
      let formatedData = []
      for (let i = 0; i < price.length; i++) {
        let date = new Date(price[i][0])
        let hour = date.toLocaleDateString()
        hour = hour.split('/').join('-')
        let min = date.toLocaleTimeString()
        let time = `${hour} ${min}`
        formatedData.push({ x: time, y: price[i][1] })
      }
      // console.log(formatedData)
      return formatedData
    })
    .catch(err=>{
      console.log("Error while fetching coin data")
    })

  return data
}

export const ChartAllData = async (coin) => {
  const data = await CoinGeckoClient.coins
    .fetchMarketChart(coin,{days:365})
    .then((data) => {
        console.log('chart data::',data.data.prices)
      let price = data.data.prices
      /* let formatedData = []
      for (let i = 0; i < price.length; i++) {
        let date = new Date(price[i][0])
        let hour = date.getHours()
        let min = date.getMinutes()
        let time = `${hour}:${min}`
        formatedData.push({ x: time, y: price[i][1] })
      } */
      //   console.log(formatedData)
      return price
    })
    .catch(err=>{
      console.log("Error while fetching coin data")
    })

  return data
}
