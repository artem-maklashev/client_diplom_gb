import BoardProduction from "../../../model/production/BoardProduction";
import React from "react";
import {Col, Row, Table} from "react-bootstrap";

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
    const categorySummary: { [categoryName: string]: number } = {};
    data.forEach(production => {
        const shiftName: string = (production.productionList.shift && production.productionList.shift.name) || 'Unknown Shift';
        const categoryName = production.gypsumBoardCategory.title;
        if (production.gypsumBoardCategory.id > 4 && production.gypsumBoardCategory.id !== 6) {
            if (!categorySummary[categoryName]){
                categorySummary[categoryName] = 0;
            }
            categorySummary[categoryName] += production.value;
        }
        if (!productionDict[shiftName]) {
            productionDict[shiftName] = new ProductionByShift(0, 0);
        }

        if (production.gypsumBoardCategory.id === 1) {
            productionDict[shiftName].total += production.value;
        } else if (production.gypsumBoardCategory.id > 1 && production.gypsumBoardCategory.id < 5) {
            productionDict[shiftName].goodProduct += production.value;
        }
    });
    Object.entries(categorySummary).sort((a, b) => b[1] - a[1]);
    const shiftTable = (
            <Col>
                <Row>
                    <Table striped bordered hover responsive variant="light">
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
                </Row>
                <Row>
                    <Table striped bordered hover responsive variant="light">
                        <thead className="table-dark">
                        <tr>
                            <th>Виды брака</th>
                            <th colSpan={2}>Количество</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(categorySummary).map(([category, value], index) => (
                            <tr key={category}>
                                <td>{category}</td>
                                <td>{value.toFixed(2)} м²</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            </Col>

        )
    ;
    return <div>{shiftTable}</div>;
}
export default ShiftsDefect;