import React from "react";
import Autocomplete from "react-autocomplete";
import { useDummyFetch, FetchDummyDataType } from "../hooks/useDummyFetch";

type AutocompleteItemType = {
  label: string;
};

export function getCustomSuggestions(res: FetchDummyDataType): JSX.Element[] {
  if (res.error)
    return [<div>error: {JSON.stringify(res.error, null, 2)} </div>];
  if (res.data === null) return [];
  return res.data.map((d, i) => <div key={i}>{d}</div>);
}

function getAutocompleteItems(res: FetchDummyDataType): AutocompleteItemType[] {
  if (res.data === null) return [];
  return res.data.map((d) => ({ label: d }));
}

function renderAutocompleteItems(
  item: AutocompleteItemType,
  isHighlighted: boolean
): JSX.Element {
  return (
    <div
      key={item.label}
      style={{ background: isHighlighted ? "lightgray" : "white" }}
    >
      {item.label}
    </div>
  );
}

function reduceSearchValue(val: string): string {
  if (val.length < 3) return "";
  return val;
}

export default function SearchbarPage() {
  const [customValue, setCustomValue] = React.useState("");
  const customResp = useDummyFetch(reduceSearchValue(customValue));

  const [autocompleteValue, setAutocompleteValue] = React.useState("");
  const autocompleteResp = useDummyFetch(reduceSearchValue(autocompleteValue));

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomValue(e.target.value);
  }

  function handleAutocompleteChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAutocompleteValue(e.target.value);
  }

  function handleAutocompleteSelect(val: string) {
    setAutocompleteValue(val);
  }

  return (
    <div>
      <h2>Searchbar Page</h2>
      <p>Searching random APIs</p>
      <h4>React Autocomplete</h4>
      <p>
        Looks nice and easy to use, but introduces some warnings about
        componentWillMount
      </p>
      <Autocomplete
        getItemValue={(item) => item.label}
        items={getAutocompleteItems(autocompleteResp)}
        renderItem={renderAutocompleteItems}
        value={autocompleteValue}
        onChange={handleAutocompleteChange}
        onSelect={handleAutocompleteSelect}
        inputProps={{ placeholder: "Enter something..." }}
      />
      <h4>Custom Searchbar</h4>
      <p>
        Implementation from scratch, probably takes a while to get everything
        right
      </p>
      <form>
        <input
          type="text"
          placeholder="Enter something..."
          onChange={handleCustomChange}
          value={customValue}
        />
        {getCustomSuggestions(customResp)}
      </form>
    </div>
  );
}
