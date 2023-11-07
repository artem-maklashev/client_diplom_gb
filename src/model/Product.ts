import TradeMark from "./TradeMark";
import Types from "./Types";

class Product {
    id: number;
    pType: Types;
    tradeMark: TradeMark;

    constructor(id: number, pType: Types, tradeMark: TradeMark) {
        this.id = id;
        this.pType = pType;
        this.tradeMark = tradeMark;
    }
}
export default Product;