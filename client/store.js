import {configureStore} from '@reduxjs/toolkit';

import rootReducer from './reducers/rootReducer';

//configure store is the method from toolkit that we use to combine our slices. 
//the devTools option I grabbed from a CodeSmith unit. It ensures that we aren't wasting compute by running dev tools in production mode (npm start)
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
})
//  (⌐⊙_⊙) -- guess where we are going to import this... -- (⊙_⊙¬) \\
export default store;