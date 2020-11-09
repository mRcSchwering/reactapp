import React from "react";
import styles from "./SearchPanel.module.css";
import { useHistory } from "react-router-dom";
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

function useSuggestedNames(
  search: string | null
): { name: string; id: number }[] {
  const res = useQuery(CHARACTER_NAMES_QUERY);

  if (res.data === null || search === null || search.length === 0) {
    return [];
  }

  return res.data.characters.results
    .map((d) => ({ name: d.name, id: d.id }))
    .filter((d) => d.name.toLowerCase().includes(search));
}

type SuggestionsProps = {
  input: string;
  focus: boolean;
};

function Suggestions(props: SuggestionsProps): JSX.Element {
  const names = useSuggestedNames(props.input);

  if (names.length < 1 || !props.focus) {
    return <div></div>;
  }

  const suggestionDivs = names.map((d) => (
    <div className={styles.SuggestionItem} key={d.id}>
      <Nav className="ml-auto">
        <Nav.Link
          className={styles.NavLink}
          key="d"
          href={`/browse?search=${d.name}&id=${d.id}`}
        >
          {d.name}
        </Nav.Link>
      </Nav>
    </div>
  ));

  return (
    <div className={styles.SuggestionsContainer}>
      <div className={styles.Suggestions}>{suggestionDivs}</div>
    </div>
  );
}

type SearchBarProps = {
  input: string;
  focus: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
};

function SearchBar(props: SearchBarProps) {
  return (
    <div
      className={props.focus ? styles.SearchBarFocused : styles.SearchBar}
      onFocus={(e) => props.onFocus()}
      onBlur={(e) => props.onBlur()}
    >
      <div className={styles.SearchInputContainer}>
        <input
          value={props.input}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          className={styles.SearchInput}
        />
      </div>
    </div>
  );
}

export default function SearchPanel(): JSX.Element {
  const history = useHistory();
  const [input, setInput] = React.useState("");
  const [inFocus, setInFocus] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      history.push(`/browse?search=${input}`);
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
      <Suggestions input={input} focus={inFocus} />
    </div>
  );
}
