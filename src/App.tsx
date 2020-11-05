import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./assets/logo.svg";
import styles from "./App.module.css";
import HomePage from "./pages/HomePage";
import MapsPage from "./pages/MapsPage";
import SearchbarPage from "./pages/SearchbarPage";
import RequestsPage from "./pages/RequestsPage";
import TestTriggersPage from "./pages/TestTriggersPage";
import { ErrorModalContextProvider } from "./components/ErrorModalContext";

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

type PageType = {
  href: string;
  title: string;
  component: () => JSX.Element;
};

const PAGES: PageType[] = [
  { href: "/", component: HomePage, title: "Home" },
  { href: "/requests", component: RequestsPage, title: "Requests" },
  { href: "/maps", component: MapsPage, title: "Maps" },
  { href: "/searchbar", component: SearchbarPage, title: "Searchbar" },
  {
    href: "/testtriggers",
    component: TestTriggersPage,
    title: "Test Triggers",
  },
];

function getNavLink(page: PageType): JSX.Element {
  return (
    <Nav.Link key={page.href} href={page.href}>
      {page.title}
    </Nav.Link>
  );
}

function getRoute(page: PageType): JSX.Element {
  if (page.href === "/") {
    return (
      <Route
        key={page.href}
        path={page.href}
        exact
        component={page.component}
      />
    );
  } else {
    return (
      <Route key={page.href} path={page.href} component={page.component} />
    );
  }
}

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" className={styles.NavBar}>
        <Nav className="ml-auto">{PAGES.map(getNavLink)}</Nav>
      </Navbar>
    </header>
  );
}

function App() {
  return (
    <ErrorModalContextProvider>
      <div className={styles.App}>
        <Header />
        <div className={styles.AppBody}>
          <Router>{PAGES.map(getRoute)}</Router>
        </div>
      </div>
    </ErrorModalContextProvider>
  );
}

export default App;

// <img src={logo} className={styles.AppLogo} alt="logo" />
