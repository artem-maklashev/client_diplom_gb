import Product from "../Product";
import TradeMark from "../TradeMark";
import Types from "../Types";
import BoardType from "./BoardType";
import Edge from "./Edge";
import Length from "./Length";
import Thickness from "./Thickness";
import Width from "./Width";

class GypsumBoard extends Product {
    boardType: BoardType;
    edge: Edge;
    thickness: Thickness;
    width: Width;
    length: Length;

    constructor(id: number, pType: Types, tradeMark: TradeMark, boardType: BoardType, edge: Edge, thickness: Thickness, width: Width, length: Length) {
        super(id, pType, tradeMark);
        this.boardType = boardType;
        this.edge = edge;
        this.thickness = thickness;
        this.width = width;
        this.length = length;
    }

}
export default GypsumBoard;