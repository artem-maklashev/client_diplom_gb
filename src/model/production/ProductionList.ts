class ProductionList {
    id: number;
    pStart: Date;
    pEnd: Date;
    shiftId: number;
    pTypeId: number;
    pDate: Date;

    constructor(id: number, pStart: Date, pEnd: Date, shiftID: number,pTypeId: number, pDate: Date) {
        this.id = id;
        this.pStart = pStart;
        this.pEnd = pEnd;
        this.shiftId = shiftID;
        this.pTypeId = pTypeId;
        this.pDate = pDate;
    }
}
export default ProductionList;