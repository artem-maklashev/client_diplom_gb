import React from "react";
import Delays from "../../../model/delays/Delays";
import DelayDataPrepare from "./DalayDataPrepare";

interface DelaysTableProps {
    data: Delays[];
}

const DelaysTable: React.FC<DelaysTableProps> = ({ data }) => {
    if (data.length === 0) {
        return <div>Данных нет</div>;
    }

    const filteredData = data.filter(
        (item) => item.unitPart.unit.productionArea.division.id === 1
    );

    const preparedData = new DelayDataPrepare(filteredData).getSummary();
    const delaysSummary = preparedData.delaysSummary;
    const unitData = preparedData.unitData





    // const delaysSummary: { [key: string]: number } = {};
    // const unitData: { [key: string]: Delays[] } = {};

    // // Группируем данные по типу простоя
    // filteredData.forEach((item) => {
    //     const delayType = item.delayType.name;
    //     const unitName = item.unitPart.unit.name;
    //     const deltaTime =
    //         (new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) /
    //         (60 * 1000);

    //     if (!unitData[delayType]) {
    //         unitData[delayType] = [];
    //     }

    //     // Ищем элемент с таким же unit в текущем типе простоя
    //     const existingItem = unitData[delayType].find(
    //         (existing) => existing.unitPart.unit.name === unitName
    //     );

    //     if (existingItem) {
    //         // Если найден, суммируем длительность
    //         existingItem.delta += deltaTime;
    //     } else {
    //         // Если не найден, добавляем новый элемент
    //         unitData[delayType].push({ ...item, delta: deltaTime });
    //     }

    //     // Инициализация суммарного времени для данного типа простоя
    //     if (!delaysSummary[delayType]) {
    //         delaysSummary[delayType] = 0;
    //     }

    //     // Обновление суммарного времени для данного типа простоя
    //     delaysSummary[delayType] += deltaTime;
    // });

    const tables = Object.entries(unitData).map(
        ([delayType, tableData], tableIndex) => (
            <div key={`table-${tableIndex}`}>
                <h3>{delayType}</h3>
                <table
                    className="table table-striped table-bordered table-hover table-auto table-light"
                    id={`gypsumBoardTable-${tableIndex}`}
                >
                    <thead className="table-dark text-center">
                    <tr>
                        <th>Тип простоя</th>
                        <th>Участок</th>
                        <th>Узел</th>
                        <th>Деталь</th>
                        <th>Длительность</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((item, index) => (
                        <tr key={`${delayType}-${index}`}>
                            <td>{item.delayType.name}</td>
                            <td>{item.unitPart.unit.productionArea.name}</td>
                            <td>{item.unitPart.unit.name}</td>
                            <td>{item.unitPart.name}</td>
                            <td className="text-center">{item.delta}</td>
                        </tr>
                    ))}
                    {/* Добавляем промежуточные итоги для каждой таблицы */}
                    <tr key={`total-${tableIndex}`} className="table-success">
                        <td>{delayType}</td>
                        <td colSpan={3} className="text-end"><strong>Итого</strong></td>
                        <td className="text-center"><strong>{delaysSummary[delayType]}</strong></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    );

    return <div>{tables}</div>;
};

export default DelaysTable;
