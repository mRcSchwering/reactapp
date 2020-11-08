import React from "react";
import styles from "./BrowsePage.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

function useQueryStringParams() {
  return new URLSearchParams(useLocation().search);
}

type RamCharacterDataType = {
  character: {
    name: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      dimension: string;
    };
    status: string;
  };
};

type RamCharacterVarsType = {
  id: number;
};

const RAM_CHARACTER_QUERY = gql`
  query RamChars($id: ID!) {
    character(id: $id) {
      name
      species
      type
      gender
      origin {
        name
        dimension
      }
      status
    }
  }
`;

function useSuggestedNames(search: string | null): string[] {
  const query = gql`
    query {
      characters {
        results {
          name
        }
      }
    }
  `;
  const res = useQuery(query);
  if (res.data === null || search === null || search === "") {
    return [];
  }
  return res.data.characters.results
    .map((d) => d.name)
    .filter((d: string) => d.toLowerCase().includes(search));
}

export function getResultElement(res: { loading; error?; data }): JSX.Element {
  if (res.loading) return <>loading...</>;
  if (res.error) return <>error: {JSON.stringify(res.error, null, 2)} </>;
  return <>{JSON.stringify(res.data, null, 2)}</>;
}

function SearchPanel() {
  const history = useHistory();
  const [input, setInput] = React.useState("");
  const suggestedNames = useSuggestedNames(input);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      history.push(`/browse?search=${input}`);
    }
  }

  return (
    <div>
      <div className={styles.SearchPanel}>
        <div>The search panel</div>
        <Form.Control
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>{suggestedNames.join(", ")}</div>
    </div>
  );
}

export default function BrowsePage(): JSX.Element {
  const queryStringParams = useQueryStringParams();
  const search = queryStringParams.get("search");

  const ram = useQuery<RamCharacterDataType, RamCharacterVarsType>(
    RAM_CHARACTER_QUERY,
    { variables: { id: 1 } }
  );

  return (
    <div>
      <SearchPanel />
      <div style={{ width: 800, marginLeft: 200 }}>
        <pre style={{ textAlign: "left" }}>{getResultElement(ram)}</pre>
      </div>
      <h2>Browse Page</h2>
      <p>Searched: {search}</p>
    </div>
  );
}
