import React from "react";
import styles from "./ShoppingCartButton.module.css";
import ShoppingCartIcon from "../assets/shopping-cart.svg";

type ShoppingCartButtonProps = {
  id: string;
};

// TODO: these functions should be somewhere more global
function productInSession(id: string): boolean {
  let products: { productId: string }[] = [];
  const sessionProducts = localStorage.getItem("shoppingCart");
  if (sessionProducts) {
    products = JSON.parse(sessionProducts);
  }
  return products.map((d) => d.productId).includes(id);
}

function addProduct(id: string): void {
  let products: { productId: string }[] = [];
  const sessionProducts = localStorage.getItem("shoppingCart");
  if (sessionProducts) {
    products = JSON.parse(sessionProducts);
  }
  products.push({ productId: id });
  localStorage.setItem("shoppingCart", JSON.stringify(products));
}

function removeProduct(id: string): void {
  let products: { productId: string }[] = [];
  const sessionProducts = localStorage.getItem("shoppingCart");
  if (sessionProducts) {
    products = JSON.parse(sessionProducts);
  }
  products = products.filter((d) => d.productId !== id);
  localStorage.setItem("shoppingCart", JSON.stringify(products));
}

// TODO: This should rather be a controlled component without a state
export default function ShoppingCartButton(
  props: ShoppingCartButtonProps
): JSX.Element {
  const [isSelected, setIsSelected] = React.useState(
    productInSession(props.id)
  );

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const targetId = e.target["id"];
    if (isSelected) {
      removeProduct(targetId);
    } else {
      addProduct(targetId);
    }
    setIsSelected((prevState) => !prevState);
  }

  return (
    <div className={styles.container}>
      <img
        className={isSelected ? styles.selected : styles.unselected}
        src={ShoppingCartIcon}
        alt="add to shopping cart"
        id={props.id}
        onClick={handleClick}
      />
    </div>
  );
}
