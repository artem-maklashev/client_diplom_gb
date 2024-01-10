import GypsumBoard from "./GypsumBoard";

class Plan {
    id: number;
    plan_date: Date;
    gypsum_board_id: GypsumBoard;
    planValue: number;

    constructor(id: number, plan_date: Date, gypsum_board_id: GypsumBoard, value: number) {
        this.id = id;
        this.plan_date = plan_date;
        this.gypsum_board_id = gypsum_board_id;
        this.planValue = value;
    }
}
export default Plan;