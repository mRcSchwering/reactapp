type shoppingCartItem = {
  id: string;
};

/**
 * Get list of all ids in shopping cart
 */
export function getShoppingCartIds(): string[] {
  let items: shoppingCartItem[] = [];
  const prevItems = localStorage.getItem("shoppingCart");
  if (prevItems) {
    items = JSON.parse(prevItems);
  }
  return items.map((d) => d.id);
}

/**
 * Add id to arr of ids in shopping cart
 * @param id product id
 */
export function addShoppingCartId(id: string): void {
  let items: shoppingCartItem[] = [];
  const prevItems = localStorage.getItem("shoppingCart");
  if (prevItems) {
    items = JSON.parse(prevItems);
  }
  items.push({ id: id });
  localStorage.setItem("shoppingCart", JSON.stringify(items));
}

/**
 * Remove items with this id from arr of ids in shopping cart
 * @param id product id
 */
export function removeShoppingCartId(id: string): void {
  let items: shoppingCartItem[] = [];
  const prevItems = localStorage.getItem("shoppingCart");
  if (prevItems) {
    items = JSON.parse(prevItems);
  }
  items = items.filter((d) => d.id !== id);
  localStorage.setItem("shoppingCart", JSON.stringify(items));
}
