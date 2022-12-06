import { ShoppingCartItem } from "./ShoppingCartItem";
import { BookItem } from "@/types";

export class ShoppingCart {
  private itemArray: ShoppingCartItem[];

  constructor() {
    this.itemArray = [];
  }

  get numberOfItems(): number {
    return this.itemArray.reduce((count: number, item: ShoppingCartItem) => {
      return count + item.quantity;
    }, 0);
  }

  get empty(): boolean {
    return this.itemArray.length <= 0;
  }

  get subtotal() {
    return this.itemArray.reduce((amount: number, item: ShoppingCartItem) => {
      return amount + item.book.price * item.quantity;
    }, 0);
  }

  get total() {
    return this.subtotal + this.surcharge;
  }

  get surcharge() {
    return 500;
  }

  clear(): void {
    this.itemArray = [];
  }

  addBook(book: BookItem) {
    const existingItem = this.itemArray.find(
      (item) => item.book.bookId == book.bookId
    );
    if (!existingItem) {
      const newItem = new ShoppingCartItem(book);
      newItem.quantity = 1;
      this.itemArray.push(newItem);
    } else {
      existingItem.quantity++;
    }
  }

  update(book: BookItem, quantity: number) {
    if (quantity < 0 || quantity > 99) return;

    const existingItemIndex = this.itemArray.findIndex(
      (item) => item.book.bookId == book.bookId
    );
    if (existingItemIndex !== -1) {
      if (quantity !== 0) {
        this.itemArray[existingItemIndex].quantity = quantity;
      } else {
        this.itemArray.splice(existingItemIndex, 1);
      }
    }
  }

  get items(): readonly ShoppingCartItem[] {
    return this.itemArray;
  }
}
