import React from "react";
import { useLocation } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import SearchPanel from "../components/SearchPanel";

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

export function getResultElement(res: { loading; error?; data }): JSX.Element {
  if (res.loading) return <>loading...</>;
  if (res.error) return <>error: {JSON.stringify(res.error, null, 2)} </>;
  return <>{JSON.stringify(res.data, null, 2)}</>;
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
      <h2>Browse Page</h2>
      <p>Searched: {search}</p>
      <h4>Result</h4>
      <div style={{ width: 800, marginLeft: 200 }}>
        <pre style={{ textAlign: "left" }}>{getResultElement(ram)}</pre>
      </div>
    </div>
  );
}
