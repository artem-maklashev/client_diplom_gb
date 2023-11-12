class ProductionList {
    id: number;
    pStart: Date;
    pEnd: Date;
    shiftId: number;
    pTypeId: number;

    constructor(id: number, pStart: Date, pEnd: Date, shiftID: number,pTypeId: number) {
        this.id = id;
        this.pStart = pStart;
        this.pEnd = pEnd;
        this.shiftId = shiftID;
        this.pTypeId = pTypeId;
    }
}
export default ProductionList;