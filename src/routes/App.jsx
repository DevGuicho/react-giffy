import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Layout from "components/Layout";
import NotFound from "pages/NotFound";

const LazyHome = lazy(() => import("../pages/Home"));
const LazyDetail = lazy(() => import("../pages/Detail"));
const LazySearchResult = lazy(() => import("../pages/SearchResult"));
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/" component={LazyHome} />
            <Route
              exact
              path="/search/:keyword/:rating?"
              component={LazySearchResult}
            />
            {/* 
            <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterPage} /> */}
            <Route exact path="/gif/:id" component={LazyDetail} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
