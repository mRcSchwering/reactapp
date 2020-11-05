import React from "react";
import Autocomplete from "react-autocomplete";
import { useFetchHackerNewsData } from "../hooks/useFetchData";

export function getResultElement(res: { loading; error?; data }): JSX.Element {
  if (res.loading) return <>loading...</>;
  if (res.error) return <>error: {JSON.stringify(res.error, null, 2)} </>;
  return <>{JSON.stringify(res.data, null, 2)}</>;
}

export default function HomePage() {
  const [hnId, setHnId] = React.useState(8863);
  const hn = useFetchHackerNewsData(hnId);

  function handleAutocompleteChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHnId(123); // e.target.value
  }

  function handleAutocompleteSelect(val: string) {
    setHnId(1234); // val
  }

  return (
    <div>
      <Autocomplete
        getItemValue={getResultElement}
        items={hn}
        renderItem={(d) => d}
        value={"asd"}
        onChange={handleAutocompleteChange}
        onSelect={handleAutocompleteSelect}
        inputProps={{ placeholder: "Enter something..." }}
      />
    </div>
  );
}
