import UnitPart from "./UnitPart";
import Shift from "../Shift";
import GypsumBoard from "../gypsumBoard/GypsumBoard";
import DelayType from "./DelayType";

class Delays {
    id: number;
    delayDate: Date;
    startTime: Date;
    endTime: Date;
    unitPart: UnitPart;
    shift: Shift;
    gypsumBoard: GypsumBoard;
    delayType: DelayType;
    delta: number;



    constructor(id: number, delayDate: Date, startTime: Date, endTime: Date, unitPart: UnitPart, shift: Shift, gypsumBoard: GypsumBoard, delayType: DelayType) {
        this.id = id;
        this.delayDate = delayDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.unitPart = unitPart;
        this.shift = shift;
        this.gypsumBoard = gypsumBoard;
        this.delayType = delayType;
        this.delta = 0;
    }

    toString(): string {
        // Проверка, что startTime и endTime - объекты типа Date
            return this.delta.toString();
        }

}
export default Delays;