import { createStore } from 'vuex'
import contacts from './modules/contact'

const storeOptions = {
    strict: true,
    state: {
    },
    modules:{
        contacts
    }
}
const store = createStore(storeOptions)
export default store