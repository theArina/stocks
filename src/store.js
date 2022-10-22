import { reactive } from 'vue'
import { sendMessage } from './web-socket'

export const store = reactive({
  subscriptions: {},
  /*
    Validation rules:
    An ISIN is a 12-character alphanumeric code. It consists of three parts: A two letter country code,
    a nine character alpha-numeric national security identifier, and a single check digit.
    Example:
     US0378331005
     DE000BASF111
  */
  validateISIN(isin) {
    const errorText = 'ISIN is not valid'
    if (!/^\w{12}$/.test(isin)) throw new Error(errorText)
    const spl = isin.split('')
    const countryCode = spl.splice(0, 2).join('')
    const isValid = /^[A-Z]{2}$/.test(countryCode) && /\d/.test(spl[spl.length - 1])
    if (!isValid) throw new Error(errorText)
  },
  checkISINPresence(isin) {
    if (typeof this.subscriptions[isin] !== 'undefined') {
      throw new Error('Subscription already exists')
    }
  },
  async subscribe(isin) {
    await sendMessage({ subscribe: isin })
    this.subscriptions = {
      ...this.subscriptions,
      [isin]: null
    }
  },
  async unsubscribe(isin) {
    await sendMessage({ unsubscribe: isin })
    delete this.subscriptions[isin] // TODO: is it necessary to be immutable ?
  },
  onMessage(data) {
    const { isin, price } = JSON.parse(data)
    if (!isin || !price) return
    this.subscriptions = {
      ...this.subscriptions,
      [isin]: price
    }
  },
  /*
  Response example:
  {
    "isin": "DE000BASF111",
    "price": 11.316359370403822,
    "bid": 11.306359370403822,
    "ask": 11.326359370403821
  }*/
  onCloseConnection() {
    const subscriptions = {}
    const promises = []
    for (const isin in this.subscriptions) {
      subscriptions[isin] = null
      promises.push(this.subscribe(isin))
    }
    this.subscriptions = subscriptions
    Promise.all(promises) // TODO: to wait
  }
})
