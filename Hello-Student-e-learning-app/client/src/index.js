import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import CourseStore from "./store/CourseStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        course: new CourseStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

