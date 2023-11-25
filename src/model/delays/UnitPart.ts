import Unit from "./Unit";

class UnitPart {
    id: number;
    name: string;
    unit: Unit;


    constructor(id: number, name: string, unit: Unit) {
        this.id = id;
        this.name = name;
        this.unit = unit;
    }
}
export default UnitPart;