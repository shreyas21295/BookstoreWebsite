export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  description: string;
  price: number;
  isFeatured: boolean;
  isPublic: boolean;
  rating: number;
  categoryId: number;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
  lineItems: LineItem[];
}

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

  get subtotal(): number {
    return this.itemArray.reduce((amount: number, item: ShoppingCartItem) => {
      return amount + item.product.price * item.quantity;
    }, 0);
  }

  get total(): number {
    return this.subtotal + this.surcharge;
  }

  get surcharge(): number {
    return 500;
  }

  clear(): void {
    this.itemArray = [];
  }

  addProduct(product: BookItem) {
    const existingItem = this.itemArray.find(
      (item) => item.product.bookId === product.bookId
    );
    if (!existingItem) {
      const newItem = new ShoppingCartItem(product);
      newItem.quantity = 1;
      this.itemArray.push(newItem);
    } else {
      existingItem.quantity++;
    }
  }

  update(product: BookItem, quantity: number) {
    if (quantity < 0 || quantity > 99) return;

    const existingItemIndex = this.itemArray.findIndex(
      (item) => item.product.bookId === product.bookId
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

export class ShoppingCartItem {
  readonly product: BookItem;
  quantity: number;

  constructor(theProduct: BookItem) {
    this.product = theProduct;
    this.quantity = 1;
  }

  toJSON() {
    return {
      product: this.product,
      quantity: this.quantity,
    };
  }
}
