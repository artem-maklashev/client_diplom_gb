class GypsumBoardInputData {
    boardTitle: string;
    planValue: number;
    factValue: number;
    defectiveValue: number;
    total: number;


    constructor(boardTitle: string, plan: number, fact: number, defect: number, total: number) {
        this.boardTitle = boardTitle;
        this.planValue = plan;
        this.factValue = fact;
        this.defectiveValue = defect;
        this.total = total;
    }
}
export default GypsumBoardInputData;