import React, {useEffect} from 'react';

// router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// global styles
import './App.css';

// components
import Navbar from "./components/navbar";
import SignIn from "./components/sign-in-form";
import SignInPage from "./components/sign-in-page";
import SignUp from "./components/sign-up-form";
import SignUpConfirmPage from "./components/sign-up-confirm-page";
import Alert from "./features/alert/Alert";
import Spinner from "./features/spinner/Spinner";
import SignUpPage from "./components/sign-up-page";
import SettingsPage from "./components/settings-page";
import PrivateRoute from "./libs/PrivateRoute";
import Footer from "./components/footer";
import MessagesPage from "./components/messages-page";
import FavoritesPage from "./components/favorites-page";

import {useSelector, useDispatch} from 'react-redux';
import {selectAccount, restoreSession} from './features/account/accountSlice';

function App() {
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const refreshToken = localStorage.getItem('refreshToken');
      // const user = localStorage.getItem('user');
      dispatch(restoreSession({
        // user: user,
        accessToken: accessToken,
        refreshToken: refreshToken
      }));
    }
  });

  return (
    <Router>
      <Navbar/>
      <main role="main" className="container-fluid">
        <Alert/>
        <Switch>
          <PrivateRoute path="/profile" accessToken={account.accessToken}>
          </PrivateRoute>
          <PrivateRoute path="/messages" accessToken={account.accessToken}>
            <MessagesPage/>
          </PrivateRoute>
          <PrivateRoute path="/favorites" accessToken={account.accessToken}>
            <FavoritesPage/>
          </PrivateRoute>
          <PrivateRoute path="/settings" accessToken={account.accessToken}>
            <SettingsPage/>
          </PrivateRoute>
          <Route path="/sign-in">
            <SignInPage/>
          </Route>
          <Route path="/sign-up">
            <SignUpPage/>
          </Route>
          <Route path="/sign-up-confirm/:token">
            <SignUpConfirmPage/>
          </Route>
          <Route path="/">
          </Route>
          <Route path="/offers">
          </Route>
        </Switch>
        <Spinner/>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
