import ProductionList from "./ProductionList";
import GypsumBoard from "../gypsumBoard/GypsumBoard";
import GypsumBoardCategory from "../gypsumBoard/GypsumBoardCategory";
import gypsumBoard from "../gypsumBoard/GypsumBoard";
import gypsumBoardCategory from "../gypsumBoard/GypsumBoardCategory";

class BoardProduction {
    id: number;
    pList: ProductionList;
    gypsumBoard: GypsumBoard;
    gypsumBoardCategory: GypsumBoardCategory;
    value: number;


    constructor(id: number, pList: ProductionList, gypsumBoard: GypsumBoard, gypsumBoardCategory: GypsumBoardCategory, value: number) {
        this.id = id;
        this.pList = pList;
        this.gypsumBoard = gypsumBoard;
        this.gypsumBoardCategory = gypsumBoardCategory;
        this.value = value;
    }
}
export default BoardProduction;