import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './root-reducer';
import thunk from 'redux-thunk';

const composedMiddlewares = applyMiddleware(thunk);


const storeEnhancers = composeWithDevTools({
    name: "Sample"
  })(composedMiddlewares);

const makeStore = createStore(reducers, storeEnhancers);

export default makeStore;


