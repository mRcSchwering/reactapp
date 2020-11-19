import React from "react";
import useEffectNoInit from "../hooks/useEffectNoInit";
import styles from "./ItemCard.module.css";
import ShoppingCartButton from "./ShoppingCartButton";
import {
  removeShoppingCartId,
  addShoppingCartId,
} from "../modules/localStorage";
import { CharacterType } from "../hooks/rickMortyQueries";

type ItemCardProps = {
  item: CharacterType;
  isSelected: boolean;
};

export default function ItemCard(props: ItemCardProps): JSX.Element {
  const [isSelected, setIsSelected] = React.useState(props.isSelected);

  function handleCardClick() {
    console.log("Clicked on item", props.item.id);
  }

  function handleShoppingCartClick() {
    setIsSelected((prevState) => !prevState);
  }

  useEffectNoInit(() => {
    if (isSelected) {
      addShoppingCartId(props.item.id);
    } else {
      removeShoppingCartId(props.item.id);
    }
  }, [isSelected]);

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.imagebox}>
        <img
          src={props.item.image}
          className={styles.avatar}
          alt={props.item.name}
        />
      </div>
      <div className={styles.textbox}>
        <h2>{props.item.name}</h2>
        <div>
          {props.item.species} ({props.item.gender})<br />
          {props.item.type} Status: {props.item.status}
          <br />
          Origin: {props.item.origin.name} {props.item.origin.dimension}
        </div>
      </div>
      <div className={styles.cartbox}>
        <ShoppingCartButton
          id={props.item.id}
          isSelected={isSelected}
          onClick={handleShoppingCartClick}
        />
      </div>
    </div>
  );
}
