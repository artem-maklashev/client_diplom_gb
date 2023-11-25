import ProductionArea from "./ProductionArea";

class Unit {
    id: number;
    name: string;
    productionArea: ProductionArea;


    constructor(id: number, name: string, productionArea: ProductionArea) {
        this.id = id;
        this.name = name;
        this.productionArea = productionArea;
    }
}
export default Unit;