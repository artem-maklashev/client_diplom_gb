class TradeMark {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    toString() {
        return this.name;
    }
}
export default TradeMark;