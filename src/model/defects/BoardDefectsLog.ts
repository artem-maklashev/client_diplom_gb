import BoardProduction from "../production/BoardProduction";
import Defects from "./Defects";

class BoardDefectsLog {
    id: number;
    boardProduction: BoardProduction;
    value: number;
    defects: Defects;

    constructor(id: number, boardProduction: BoardProduction, value: number, defects: Defects) {
        this.id = id;
        this.boardProduction = boardProduction;
        this.value = value;
        this.defects = defects;
    }
}
export default BoardDefectsLog;