class DefectChartData {
    pDate: Date;
    value: number;
    totalValue: number;
    defectsPresent: number;
    pDay: string;


    constructor(pDate: Date, value: number, totalValue: number, defectsPercent: number) {
        this.pDate = pDate;
        this.value = value;
        this.totalValue = totalValue;
        this.defectsPresent = defectsPercent;
        this.pDay = "";
    }
}
export default DefectChartData;