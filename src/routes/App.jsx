import Layout from "components/Layout";
import Spinner from "components/Spinner";
import { lazy, Suspense } from "react";

const { BrowserRouter, Switch, Route } = require("react-router-dom");

const LazyHome = lazy(() => import("../pages/Home"));
const LazySearchResult = lazy(() => import("../pages/SearchResult"));
const LazyGif = lazy(() => import("../pages/GifDetail"));

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={LazyHome} />
            <Route exact path="/search/:keyword" component={LazySearchResult} />
            <Route exact path="/gif/:id" component={LazyGif} />
          </Suspense>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
