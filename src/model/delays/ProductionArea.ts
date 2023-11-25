import Division from "./Division";

class ProductionArea {
    id: number;
    name: string;
    division: Division;


    constructor(id: number, name: string, division: Division) {
        this.id = id;
        this.name = name;
        this.division = division;
    }
}
export default ProductionArea;