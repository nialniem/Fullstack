import { createStore } from 'redux'
import reducer from './reducers/counterReducer'

const store = createStore(reducer)

export default store
