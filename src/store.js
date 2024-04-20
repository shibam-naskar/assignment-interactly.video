import { createStore, combineReducers } from 'redux';
import nodeReducer from './reducers/nodeReducer';

const rootReducer = combineReducers({
  nodes: nodeReducer,
});

const store = createStore(rootReducer);

export default store;