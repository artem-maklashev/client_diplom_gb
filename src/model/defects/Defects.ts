import DefectReason from "./DefectReason";
import DefectTypes from "./DefectTypes";

class Defects {
    id: number;
    name: string;
    defectTypes: DefectTypes;
    defectReason: DefectReason;

    constructor(id: number, name: string, defectTypes: DefectTypes, defectReason: DefectReason) {
        this.id = id;
        this.name = name;
        this.defectTypes = defectTypes;
        this.defectReason = defectReason;
    }
}
export default Defects;