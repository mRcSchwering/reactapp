import React from "react";
import styles from "./BrowsePage.module.css";
import { useLocation } from "react-router-dom";

function useQueryStringParams() {
  return new URLSearchParams(useLocation().search);
}

function SearchPanel() {
  return (
    <div className={styles.SearchPanel}>
      <div>The search panel</div>
    </div>
  );
}

export default function BrowsePage(): JSX.Element {
  const queryStringParams = useQueryStringParams();
  const search = queryStringParams.get("search");

  return (
    <div>
      <SearchPanel />
      <h2>Browse Page</h2>
      <p>Searched: {search}</p>
    </div>
  );
}
