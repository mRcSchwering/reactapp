import React from "react";
import ItemCard from "../components/ItemCard";

const aCharacter = {
  id: "1",
  name: "a name",
  species: "a species",
  type: "a type",
  gender: "a gender",
  image: "some-image-url",
  origin: {
    name: "a origin name",
    dimension: "a origin dimension",
  },
  status: "a status",
};

test("snapshot matches for selected ItemCard", () => {
  const res = <ItemCard item={aCharacter} isSelected={true} />;
  expect(res).toMatchSnapshot();
});

test("snapshot matches for unselected ItemCard", () => {
  const res = <ItemCard item={aCharacter} isSelected={false} />;
  expect(res).toMatchSnapshot();
});
