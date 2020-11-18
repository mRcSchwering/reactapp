import React from "react";
import useQueryStringParams from "../hooks/useQueryStringParams";
import ItemCard from "../components/ItemCard";
import SearchPanel from "../components/SearchPanel";
import { getShoppingCartIds } from "../modules/localStorage";
import { useAllCharacters } from "../hooks/rickMortyQueries";

function Results(props: {
  query: {
    loading;
    error?;
    data;
  };
  search: string | null;
}): JSX.Element {
  const products = getShoppingCartIds();

  if (props.query.loading) return <div>loading...</div>;
  if (props.query.error)
    return <div>error: {JSON.stringify(props.query.error, null, 2)} </div>;

  const searchTerm = props.search ? props.search.toLowerCase() : "";
  const items = props.query.data.characters.results
    .filter((d) => d.name.toLowerCase().includes(searchTerm))
    .map((d) => (
      <ItemCard {...d} key={d.id} isSelected={products.includes(d.id)} />
    ));

  return (
    <div style={{ width: 800, marginLeft: "auto", marginRight: "auto" }}>
      {items}
    </div>
  );
}

export default function BrowsePage(): JSX.Element {
  const search = useQueryStringParams().get("search");
  const query = useAllCharacters();

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
