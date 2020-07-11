import React from "react";
import { useDummyFetch } from "../hooks/useDummyFetch";

export function getResultElement(res: { loading; error?; data }): JSX.Element {
  if (res.loading) return <>loading...</>;
  if (res.error) return <>error: {JSON.stringify(res.error, null, 2)} </>;
  return <>{JSON.stringify(res.data, null, 2)}</>;
}

/**
 * TODO: cant avoid first render, see use DummyFetch
 */
export default function SearchbarPage() {
  console.log("search page");
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const apiState = useDummyFetch(search);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  React.useEffect(() => {
    if (value.length >= 3) {
      setSearch(value);
    }
  }, [value]);

  return (
    <div>
      <h2>Searchbar Page</h2>
      <h4>Searching random APIs</h4>
      <form>
        <input
          type="text"
          placeholder="Enter something..."
          onChange={handleInputChange}
          value={value}
        />
      </form>
      <h4>Results</h4>
      <div>
        <pre>{getResultElement(apiState)}</pre>
      </div>
    </div>
  );
}
