import React from "react";
import styles from "./SearchPanel.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CHARACTER_NAMES_QUERY = gql`
  query {
    characters {
      results {
        name
        id
      }
    }
  }
`;

type SuggestionsProps = {
  input: string;
  focus: boolean;
};

type SearchBarProps = {
  input: string;
  focus: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
};

function useQueryStringParams() {
  return new URLSearchParams(useLocation().search);
}

function useSuggestedNames(
  search: string | null,
  focus: boolean
): { name: string; id: number }[] {
  const res = useQuery(CHARACTER_NAMES_QUERY);

  if (!focus || res.data === null || search === null || search.length === 0) {
    return [];
  }

  return res.data.characters.results
    .map((d) => ({ name: d.name, id: d.id }))
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
}

function Suggestions(props: SuggestionsProps): JSX.Element | null {
  const names = useSuggestedNames(props.input, props.focus);
  const history = useHistory();

  if (!props.focus) {
    return null;
  }

  if (props.input.length < 1) {
    return (
      <div className={styles.SuggestionsContainer}>
        <div className={styles.GenericSuggestions}>
          Some Generic suggestions
        </div>
      </div>
    );
  }

  if (names.length < 1) {
    return null;
  }

  function handleSuggestionClick(e: React.MouseEvent<HTMLDivElement>) {
    const selection: string = e.target["textContent"];
    history.push(`/browse?search=${selection}`);
  }

  const suggestionDivs = names.map((d) => (
    <div
      className={styles.SuggestionItem}
      key={d.id}
      onMouseDown={handleSuggestionClick}
    >
      {d.name}
    </div>
  ));

  return (
    <div className={styles.SuggestionsContainer}>
      <div className={styles.Suggestions}>{suggestionDivs}</div>
    </div>
  );
}

function SearchBar(props: SearchBarProps) {
  const searchBarStyle = props.focus
    ? { borderColor: "rgb(142, 158, 142)" }
    : { borderColor: "transparent" };

  return (
    <div
      style={searchBarStyle}
      className={styles.SearchBar}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <input
        value={props.input}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        className={styles.SearchInput}
      />
    </div>
  );
}

export default function SearchPanel(): JSX.Element {
  const history = useHistory();
  const search = useQueryStringParams().get("search");

  const [input, setInput] = React.useState(search ? search : "");
  const [inFocus, setInFocus] = React.useState(false);

  const curtain = inFocus ? <div className={styles.curtain}></div> : null;

  React.useEffect(() => {
    setInput(search ? search : "");
  }, [search]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    setInFocus(true);
    if (e.key === "Enter") {
      history.push(`/browse?search=${input}`);
      setInFocus(false);
    }
  }

  return (
    <div className={styles.SearchBarContainer}>
      <SearchBar
        input={input}
        focus={inFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
      {curtain}
      <Suggestions input={input} focus={inFocus} />
    </div>
  );
}
