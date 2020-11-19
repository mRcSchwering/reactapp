import React from "react";
import { useHistory } from "react-router-dom";
import { useAllCharacterNames } from "../hooks/rickMortyQueries";
import useQueryStringParams from "../hooks/useQueryStringParams";
import SearchBar from "./SearchBar";
import styles from "./SearchPanel.module.css";

function useSuggestedNames(search: string | null) {
  const res = useAllCharacterNames();

  if (!res.data || !search || search.length === 0) {
    return [];
  }

  return res.data.characters.results
    .map((d) => ({ name: d.name, id: d.id }))
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
}

function GenericSuggestions(): JSX.Element {
  return (
    <div className={styles.GenericSuggestions}>Some Generic suggestions</div>
  );
}

function SpecificSuggestions(props: { items: any[] }): JSX.Element | null {
  const history = useHistory();

  function handleSuggestionClick(e: React.MouseEvent<HTMLDivElement>) {
    const selection: string = e.target["textContent"];
    history.push(`/browse?search=${selection}`);
  }

  const divs = props.items.map((d) => (
    <div
      className={styles.SuggestionItem}
      key={d.id}
      onMouseDown={handleSuggestionClick}
    >
      {d.name}
    </div>
  ));

  return divs.length < 1 ? null : (
    <div className={styles.Suggestions}>{divs}</div>
  );
}

export default function SearchPanel(): JSX.Element {
  const history = useHistory();
  const search = useQueryStringParams().get("search");
  const [input, setInput] = React.useState(search ? search : "");
  const suggestedNames = useSuggestedNames(input);

  React.useEffect(() => {
    setInput(search ? search : "");
  }, [search]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleClear() {
    setInput("");
  }

  function handleTriggerSearch(input: string) {
    history.push(`/browse?search=${input}`);
  }

  return (
    <div>
      <SearchBar
        input={input}
        onChange={handleChange}
        onTriggerSearch={handleTriggerSearch}
        onClearInput={handleClear}
        GenericSuggestions={<GenericSuggestions />}
        SpecificSuggestions={<SpecificSuggestions items={suggestedNames} />}
      />
    </div>
  );
}
