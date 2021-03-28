import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import { User } from "./lib/types/User";
import { appContext } from "./appContext";
import { fetchInit } from "./lib/auth";

const App = () => {
  const [user, setUser] = useState<User>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const setUserInfo = useCallback(
    (user: User) => {
      setUser(user);
      setIsAuth(!!user);
    },
    [setUser, setIsAuth]
  );

  const init = useCallback(async () => {
    setLoading(true);

    try {
      const user = await fetchInit();
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setUserInfo]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <appContext.Provider value={{ user, setUser: setUserInfo, isAuth }}>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <PrivateRoute path="/">
              <Main />
            </PrivateRoute>
          </Switch>
        </Router>
      )}
    </appContext.Provider>
  );
};

export default App;
