import {combineReducers} from 'redux';
import chartBuilderReducer from './chartBuilderReducer';

const allReducers = combineReducers({
    builder: chartBuilderReducer,
});

export default allReducers
