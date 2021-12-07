export class Gift {
    constructor(
        public id: string,
        public recipient: string,
        public name: string,
        public description: string,
        public url: string,
        public image: string,
        public price: string
    ) {}
}