import BoardProduction from "../../../model/production/BoardProduction";
import React from "react";
import {Col, Table} from "react-bootstrap";

interface ShiftsDefectProps {
    data: BoardProduction[];
}

class ProductionByShift {
    total: number;
    goodProduct: number;

    constructor(total: number, goodProduct: number) {
        this.total = total;
        this.goodProduct = goodProduct;
    }
}

const ShiftsDefect: React.FC<ShiftsDefectProps> = ({data}) => {
    if (data.length === 0) {
        return <div>Данных нет</div>;
    } else {
        console.log("Получены данные для процента по сменам в размере " + data.length);
    }

    const productionDict: { [shift: string]: ProductionByShift } = {};

    data.forEach(production => {
        const shiftName: string = (production.productionList.shift && production.productionList.shift.name) || 'Unknown Shift';
        if (!productionDict[shiftName]) {
            productionDict[shiftName] = new ProductionByShift(0, 0);
        }

        if (production.gypsumBoardCategory.id === 1) {
            productionDict[shiftName].total += production.value;
        } else if (production.gypsumBoardCategory.id > 1 && production.gypsumBoardCategory.id < 5) {
            productionDict[shiftName].goodProduct += production.value;
        }
    });
    const shiftTable = (

            <Table striped bordered hover variant="light">
                <thead className="table-dark">
                <tr>
                    <th>Смена</th>
                    <th colSpan={2}>Процент брака</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(productionDict).map(([shift, productionData], index) => (
                    <tr key={shift}>
                        <td>{shift}</td>
                        <td>{((1 - productionData.goodProduct / productionData.total) * 100).toFixed(2)}%</td>
                    </tr>
                ))}
                </tbody>
            </Table>

    );
    return <div>{shiftTable}</div>;
}
export default ShiftsDefect;