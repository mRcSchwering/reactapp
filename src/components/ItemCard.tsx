import React from "react";
import styles from "./ItemCard.module.css";
import ShoppingCartButton from "./ShoppingCartButton";

type ItemCardProps = {
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

export default function ItemCard(props: ItemCardProps): JSX.Element {
  // TODO: ItemCard click should lead to details page
  //       but shopping cart must still be clickable
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    console.log(e.target["id"]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.imagebox}>
        <img src={"https://picsum.photos/200/100"} />
      </div>
      <div className={styles.textbox}>
        <h2>{props.name}</h2>
        <div>
          {props.species} ({props.gender})<br />
          {props.type} Status: {props.status}
          <br />
          Origin: {props.origin.name} {props.origin.dimension}
        </div>
      </div>
      <div className={styles.cartbox}>
        <ShoppingCartButton id={props.id} />
      </div>
    </div>
  );
}
