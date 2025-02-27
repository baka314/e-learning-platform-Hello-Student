import { makeAutoObservable } from "mobx";

class BasketStore {
    basket = [];
    comment = ""; // Add comment property

    constructor() {
        makeAutoObservable(this);
    }

    addToBasket(course) {
        this.basket.push(course);
    }

    removeFromBasket(courseId) {
        this.basket = this.basket.filter((item) => item.id !== courseId);
    }
    get totalPriceHrivna() {
        return this.basket.reduce((total, item) => (total + item.price), 0);
    }
    get totalPrice() {
        return this.basket.reduce((total, item) => (total + item.price)/40, 0);
    }

    get totalItems() {
        return this.basket.length;
    }

    setComment(comment) {
        this.comment = comment;
    }

    clearBasket() {
        this.basket = [];
        this.comment = "";
    }
}

export default new BasketStore();
