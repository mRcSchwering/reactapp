import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/logo.svg";
import styles from "./App.module.css";
import { ErrorModalContextProvider } from "./components/ErrorModalContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SellPage from "./pages/SellPage";
import BrowsePage from "./pages/BrowsePage";
import HomePage from "./pages/HomePage";

library.add(faTimes, faSearch);

function HeaderPanel() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" className={styles.NavBar}>
        <a href="/">
          <img src={logo} className={styles.AppLogo} alt="logo" />
        </a>
        <Nav className="ml-auto">
          <Nav.Link key="sell" href="/sell">
            sell
          </Nav.Link>
          <Nav.Link key="login" href="/login">
            login
          </Nav.Link>
          <Nav.Link key="signup" href="/signup">
            signup
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
}

function App() {
  return (
    <ErrorModalContextProvider>
      <div className={styles.App}>
        <HeaderPanel />
        <div className={styles.AppBody}>
          <Router>
            <Route key="home" path="/" exact component={HomePage} />
            <Route key="browse" path="/browse" component={BrowsePage} />
            <Route key="login" path="/login" exact component={LoginPage} />
            <Route key="signup" path="/signup" exact component={SignupPage} />
            <Route key="sell" path="/sell" exact component={SellPage} />
          </Router>
        </div>
      </div>
    </ErrorModalContextProvider>
  );
}

export default App;
