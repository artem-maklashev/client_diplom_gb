import GypsumBoard from "./GypsumBoard";

class Plan {
    id: number;
    planDate: string;
    gypsumBoard: GypsumBoard;
    planValue: number;

    constructor(id: number, plan_date: string, gypsumBoard: GypsumBoard, value: number) {
        this.id = id;
        this.planDate = plan_date;
        this.gypsumBoard = gypsumBoard;
        this.planValue = value;
    }



}
export default Plan;