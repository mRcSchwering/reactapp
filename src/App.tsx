import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./assets/logo.svg";
import styles from "./App.module.css";
import { ErrorModalContextProvider } from "./components/ErrorModalContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SellPage from "./pages/SellPage";
import BrowsePage from "./pages/BrowsePage";
import HomePage from "./pages/HomePage";

/**
 * good search based website example RB -> have BrowserPage
 * https://www.redbubble.com/
 *
 * router with query str params -> searches in history
 * https://medium.com/better-programming/using-url-parameters-and-query-strings-with-react-router-fffdcea7a8e9
 *
 * Searchbar itself will be major feature:
 * - suggestions
 * - categorized into different topics
 * - maybe with tags in searchbar itself
 *
 * have category pages as subpage of BrowserPage
 * - entrypoint of each is like a category homepage
 * - search from there should only search within category
 * - should be reflected in search bar
 * - should be possible to remove that pre-selection
 *
 * filter if search was performed
 * - filter days old / creation date
 * - filter tags
 * - filter species
 * - filter distance
 * - filter price
 * - sort by price, distance, days old
 * - show results on map
 *
 * check if I can use this (actually for ES)
 * https://www.npmjs.com/package/@appbaseio/reactivesearch
 */

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
