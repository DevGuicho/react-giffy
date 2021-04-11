import { lazy, Suspense } from "react";
import "./App.css";
import { Link, Route } from "wouter";
import Detail from "./pages/Detail";
import SearchResult from "./pages/SearchResult";
import { GifsContextProvider } from "./context/GifsContext";

const LazyHome = lazy(() => import("./pages/Home"));

function App() {
  return (
    <GifsContextProvider>
      <div className="App">
        <header>
          <Link className="title" to="/">
            Giffy
          </Link>
        </header>
        <Suspense fallback={null}>
          <section className="App-content">
            <Route path="/" component={LazyHome} />
            <Route path="/search/:keyword" component={SearchResult} />
            <Route path="/gif/:id" component={Detail} />
            <Route path="/404" component={() => <h1>Error 404</h1>} />
          </section>
        </Suspense>
      </div>
    </GifsContextProvider>
  );
}

export default App;
