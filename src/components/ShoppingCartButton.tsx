import React from "react";
import styles from "./ShoppingCartButton.module.css";
import ShoppingCartIcon from "../assets/shopping-cart.svg";

type ShoppingCartButtonProps = {
  id: string;
  isSelected: boolean;
  onClick?: (id: string) => void;
};

export default function ShoppingCartButton(
  props: ShoppingCartButtonProps
): JSX.Element {
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (props.onClick) {
      props.onClick(e.target["id"]);
    }
    e.stopPropagation();
  }

  return (
    <div className={styles.container}>
      <img
        className={props.isSelected ? styles.selected : styles.unselected}
        src={ShoppingCartIcon}
        alt="add to shopping cart"
        id={props.id}
        onClick={handleClick}
      />
    </div>
  );
}
