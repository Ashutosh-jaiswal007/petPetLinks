import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore} from 'redux-persist'
import logger from 'redux-logger'


import {watcherSaga} from './reduxcomponent/saga'
import {reducer} from './reduxcomponent/reducer'

const middleware = [logger]
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer,applyMiddleware(sagaMiddleware,...middleware))
// export const persistor = persistStore(store)



sagaMiddleware.run(watcherSaga)


export default store