import { Gift } from "../gifts/gift.model";

export class People {
    constructor(
        public id: string,
        public name: string,
        public budget: string,
        public image: string,
        public group: Array<Gift>
        ) {}
}