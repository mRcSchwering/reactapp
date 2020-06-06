import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Iframe from 'react-iframe'


function Header() {
  return (
    <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  );
}


function HomePage() {

}


function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className="mapouter">
        <div className="gmap_canvas">
        <Iframe url="https://maps.google.com/maps?q=stranero%20berlin&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="450px"
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"/>
          </div>
        </div>
    </div>
  );
}

export default App;
