export class Gift {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public url: string,
        public image: string,
        public price: string,
        public children: Array<Gift>
    ) {}
}