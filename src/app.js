import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import {login,logout} from './actions/auth';
import 'normalize.css/normalize.css'; //מאפס את הגדרות הדפדפן השונים לפי העיצוב שלהם ומתחיל את כולם מאותו המקום
import './styles/styles.scss';
import LoadingPage from './components/LoadingPage';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () =>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};
ReactDOM.render(<LoadingPage />, document.getElementById('app'));
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard')
            }
        });
    }
    else{
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});