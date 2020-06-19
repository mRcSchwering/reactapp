import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./assets/logo.svg";
import styles from "./App.module.css";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import { ErrorModalContextProvider } from "./components/ErrorModalContext";

type PageType = {
  href: string;
  title: string;
  component: () => JSX.Element;
};

const PAGES: PageType[] = [
  { href: "/", component: HomePage, title: "Home" },
  { href: "/test", component: TestPage, title: "Test" },
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
    <header className={styles.AppHeader}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img src={logo} className={styles.AppLogo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{PAGES.map(getNavLink)}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

function App() {
  return (
    <ErrorModalContextProvider>
      <div className={styles.App}>
        <Header />
        <Router>{PAGES.map(getRoute)}</Router>
      </div>
    </ErrorModalContextProvider>
  );
}

export default App;
