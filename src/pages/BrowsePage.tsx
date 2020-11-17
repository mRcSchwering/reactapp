import React from "react";
import { useLocation } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ItemCard from "../components/ItemCard";
import SearchPanel from "../components/SearchPanel";

// TODO: should be in a more global location
function useQueryStringParams() {
  return new URLSearchParams(useLocation().search);
}

type CharacterType = {
  id: string;
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

type CharactersDataType = {
  characters: {
    results: CharacterType[];
  };
};

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
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
  }
`;

function Results(props: {
  query: {
    loading;
    error?;
    data;
  };
  search: string | null;
}): JSX.Element {
  if (props.query.loading) return <div>loading...</div>;
  if (props.query.error)
    return <div>error: {JSON.stringify(props.query.error, null, 2)} </div>;

  const searchTerm = props.search ? props.search.toLowerCase() : "";
  const items = props.query.data.characters.results
    .filter((d) => d.name.toLowerCase().includes(searchTerm))
    .map((d) => <ItemCard {...d} key={d.id} />);

  return (
    <div style={{ width: 800, marginLeft: "auto", marginRight: "auto" }}>
      {items}
    </div>
  );
}

export default function BrowsePage(): JSX.Element {
  const search = useQueryStringParams().get("search");
  const query = useQuery<CharactersDataType>(CHARACTERS_QUERY);

  return (
    <div>
      <SearchPanel />
      <h2>Browse Page</h2>
      <p>Searched: {search}</p>
      <h4>Result:</h4>
      <Results query={query} search={search} />
    </div>
  );
}
