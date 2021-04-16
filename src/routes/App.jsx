import { lazy, Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Layout from "components/Layout";
import NotFound from "pages/NotFound";
import Spinner from "components/Spinner";
import UserContext from "context/user/userContext";

const LazyHome = lazy(() => import("../pages/Home"));
const LazyDetail = lazy(() => import("../pages/Detail"));
const LazySearchResult = lazy(() => import("../pages/SearchResult"));
const LazyLogin = lazy(() => import("../pages/Login"));
const LazyRegister = lazy(() => import("../pages/Register"));

function App() {
  const { isLogged, authenticate } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) {
      authenticate();
    }
  }, [authenticate, isLogged]);

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={LazyHome} />
            <Route
              exact
              path="/search/:keyword/:rating?"
              component={LazySearchResult}
            />

            <Route exact path="/register" component={LazyRegister} />
            <Route exact path="/gif/:id" component={LazyDetail} />
            <Route exact path="/login" component={LazyLogin} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
