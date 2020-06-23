import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFetchHackerNewsData } from "../hooks/useFetchData";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styles from "./RequestsPage.module.css";

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

function getResultElement(res: any): JSX.Element {
  if (res.loading) return <>loading...</>;
  if (res.error) return <>error: {JSON.stringify(res.error, null, 2)} </>;
  return <>{JSON.stringify(res.data, null, 2)}</>;
}

export default function RequestsPage() {
  const [hnId, setHnId] = React.useState(8863);
  const hn = useFetchHackerNewsData(hnId);

  const [ramId, setRamId] = React.useState(1);
  const [queryRamId, setQueryRamId] = React.useState(ramId);
  const ram = useQuery<RamCharacterDataType, RamCharacterVarsType>(
    RAM_CHARACTER_QUERY,
    { variables: { id: queryRamId } }
  );

  function handleButtonClick() {
    setQueryRamId(ramId);
  }

  const hnResults = getResultElement(hn);
  const ramResults = getResultElement(ram);

  return (
    <div>
      <h2>Requests Page</h2>
      <h4>Hacker News REST API</h4>
      <p>Load on input change. Uses custom hook for fetching.</p>
      <div
        style={{
          height: "200px",
          width: "1000px",
          margin: "auto",
          padding: "10px",
        }}
      >
        <div className={styles.inputContainer}>
          <Form.Control
            type="number"
            value={hnId}
            onChange={(e) => setHnId(parseInt(e.currentTarget.value, 10))}
          />
        </div>
        <div className={styles.resultsContainer}>{hnResults}</div>
      </div>
      <div>
        <h4>Rick and Morty GraphQL API</h4>
        <p>
          Load on button click. The Apollo Provider (graphQL client) is mounted
          in App.tsx
        </p>
        <div className={styles.inputContainer}>
          <Form.Control
            type="number"
            value={ramId}
            onChange={(e) => setRamId(parseInt(e.currentTarget.value, 10))}
          />
          <Button onClick={handleButtonClick}>Send</Button>
        </div>
        <div className={styles.resultsContainer}>
          <pre>{ramResults}</pre>
        </div>
      </div>
    </div>
  );
}
