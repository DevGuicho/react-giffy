import Layout from "components/Layout";
import Spinner from "components/Spinner";
import useUser from "Hooks/useUser";
import { lazy, Suspense, useEffect } from "react";

const { BrowserRouter, Switch, Route } = require("react-router-dom");

const LazyHome = lazy(() => import("../pages/Home"));
const LazySearchResult = lazy(() => import("../pages/SearchResult"));
const LazyGif = lazy(() => import("../pages/GifDetail"));
const LazyLogin = lazy(() => import("../pages/LoginPage"));
const LazyRegister = lazy(() => import("../pages/RegisterPage"));
const LazyNotFound = lazy(() => import("../pages/NotFound"));

const App = () => {
  const { authenticate, isLogged } = useUser();

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
            <Route exact path="/search/:keyword" component={LazySearchResult} />
            <Route exact path="/gif/:id" component={LazyGif} />
            <Route exact path="/login" component={LazyLogin} />
            <Route exact path="/register" component={LazyRegister} />
            <Route component={LazyNotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
