import { Gift } from "../gifts/gift.model";

export class Person {
    constructor(
        public id: string,
        public name: string,
        public budget: string,
        public image: string,
        public group: Gift[]
        ) {}
}