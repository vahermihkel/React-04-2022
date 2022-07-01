
import { Subject } from "rxjs";

const cartSumChanged = new Subject();

export const cartSumService = {
  sendCartSum: (newCartSum) => cartSumChanged.next(newCartSum),
  getCartSum: () => cartSumChanged.asObservable()
}