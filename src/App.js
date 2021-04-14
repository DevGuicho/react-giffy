import { lazy, Suspense, useContext, useEffect } from "react";
import "./App.css";
import { Link, Route } from "wouter";
import Detail from "./pages/Detail";
import SearchResult from "./pages/SearchResult";
import Header from "./components/Header";
import Login from "./pages/Login";

import { GifsContextProvider } from "./context/GifsContext";
import UserContext from "./context/user/userContext";
import RegisterPage from "pages/Register";

const LazyHome = lazy(() => import("./pages/Home"));

function App() {
  const { authenticate, isLogged } = useContext(UserContext);
  useEffect(() => {
    if (!isLogged) authenticate();
  }, [isLogged, authenticate]);

  return (
    <GifsContextProvider>
      <div className="App">
        <div>
          <Header />
          <header>
            <Link className="title" to="/">
              Giffy
            </Link>
          </header>
        </div>
        <Suspense fallback={null}>
          <section className="App-content">
            <Route path="/" component={LazyHome} />
            <Route path="/search/:keyword/:rating?" component={SearchResult} />
            <Route path="/gif/:id" component={Detail} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/404" component={() => <h1>Error 404</h1>} />
          </section>
        </Suspense>
      </div>
    </GifsContextProvider>
  );
}

export default App;
