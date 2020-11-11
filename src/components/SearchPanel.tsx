import React from "react";
import styles from "./SearchPanel.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import SearchBar from "./SearchBar";
import { isTemplateSpan } from "typescript";

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

function useQueryStringParams() {
  return new URLSearchParams(useLocation().search);
}

function useSuggestedNames(
  search: string | null
): { name: string; id: number }[] {
  const res = useQuery(CHARACTER_NAMES_QUERY);

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

  function handleTriggerSearch(input: string) {
    history.push(`/browse?search=${input}`);
  }

  return (
    <div>
      <SearchBar
        input={input}
        onChange={handleChange}
        onTriggerSearch={handleTriggerSearch}
        GenericSuggestions={<GenericSuggestions />}
        SpecificSuggestions={<SpecificSuggestions items={suggestedNames} />}
      />
    </div>
  );
}
