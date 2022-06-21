import { createStore } from 'vuex'
import contacts from './modules/contact'
import user from './modules/user'

const storeOptions = {
    strict: true,
    modules:{
        contacts,
        user
    }
}
const store = createStore(storeOptions)
export default store