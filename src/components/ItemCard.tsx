import React from "react";
import useEffectNoInit from "../hooks/useEffectNoInit";
import styles from "./ItemCard.module.css";
import ShoppingCartButton from "./ShoppingCartButton";
import {
  removeShoppingCartId,
  addShoppingCartId,
} from "../modules/localStorage";

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
  isSelected: boolean;
};

export default function ItemCard(props: ItemCardProps): JSX.Element {
  const [isSelected, setIsSelected] = React.useState(props.isSelected);

  function handleCardClick() {
    console.log("Clicked on item", props.id);
  }

  function handleShoppingCartClick() {
    setIsSelected((prevState) => !prevState);
  }

  useEffectNoInit(() => {
    if (isSelected) {
      addShoppingCartId(props.id);
    } else {
      removeShoppingCartId(props.id);
    }
  }, [isSelected]);

  return (
    <div className={styles.container} onClick={handleCardClick}>
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
        <ShoppingCartButton
          id={props.id}
          isSelected={isSelected}
          onClick={handleShoppingCartClick}
        />
      </div>
    </div>
  );
}
