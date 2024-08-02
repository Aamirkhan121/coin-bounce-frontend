import axios from "axios";


const NEWS_API_ENDPOINT=`https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`
// const NEWS_API_ENDPOINT=`https://newsapi.org/v2/everything?q=business%20AND%20blockchain&sortBy=publishedAt&language=en&apiKey=f98a4aa3013043a885b26962e83dbfaf`
const CRYPTO_API_ENDPOINT=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`

export const getNews=async()=>{
    let response;

    try {
        response=await axios.get(NEWS_API_ENDPOINT)
        response=response.data.articles.slice(0,28);
    } catch (error) {
       console.log(error)
    }
    return response
}

export  const getCrypto=async()=>{
    let response;
    try {
      response=await axios.get(CRYPTO_API_ENDPOINT)  ;
      response=response.data
    } catch (error) {
        console.log(error)
    }
    return response
}
