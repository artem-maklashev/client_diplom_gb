import GypsumBoard from "../gypsumBoard/GypsumBoard";
import Shift from "../Shift";
import ProductTypes from "../ProductTypes";

class ProductionList {
    id: number;
    productionStart: Date;
    productionEnd: Date;
    productionDate: Date;
    shiftId: Shift;
    pTypeId: ProductTypes;

    constructor(id: number, pStart: Date, pEnd: Date, pDate: Date, shiftID: Shift,pTypeId: ProductTypes ) {
        this.id = id;
        this.productionStart = pStart;
        this.productionEnd = pEnd;
        this.productionDate = pDate;
        this.shiftId = shiftID;
        this.pTypeId = pTypeId;
    }
}
export default ProductionList;