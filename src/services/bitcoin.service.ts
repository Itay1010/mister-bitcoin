import axios from "axios"
import { loadFromStorage, saveToStorage } from "./storage.service"

const getRate = async () => {
    const { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    return data
}

const getMarketPrice = async () => {
    const timeLimit = Date.now() * 1000 * 60 * 60
    let res: any = loadFromStorage('market-price')
    if (!res || res?.lastRequested > timeLimit) {
        const { data } = await axios.get('https://api.blockchain.info/charts/market-price?timespan=1year&format=json&cors=true')
        data.lastRequested = Date.now()
        saveToStorage('market-price', data)
        res = data
    }
    return res
}

const getConfirmedTransactions = async () => {
    const timeLimit = Date.now() * 1000 * 60 * 60
    let res: any = loadFromStorage('trade-volume')
    if (!res || res?.lastRequested > timeLimit) {
        const { data } = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=1year&format=json&cors=true')
        data.lastRequested = Date.now()
        saveToStorage('trade-volume', data)
        res = data
    }
    return res
}

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}
