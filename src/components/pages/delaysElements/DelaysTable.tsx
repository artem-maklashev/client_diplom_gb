import Delays from "../../../model/delays/Delays";

interface DelaysTableProps {
    data: Delays[];
}

const DelaysTable: React.FC<DelaysTableProps> = ({ data }) => {
    if (data.length === 0) {
        return <div>Данных нет</div>;
    } else {
        console.log("Получены данные в размере " + data.length);
    }

    const filteredData = data.filter(
        (item) => item.unitPart.unit.productionArea.division.id === 1
    );

    const delaysSummary: { [key: string]: number } = {};
    const unitData: { [key: string]: Delays[] } = {};

    // Группируем данные по типу простоя
    filteredData.forEach((item) => {
        const delayType = item.delayType.name;
        const unitName = item.unitPart.unit.name;
        const deltaTime =
            (new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) /
            (60 * 1000);

        if (!unitData[delayType]) {
            unitData[delayType] = [];
        }

        // Ищем элемент с таким же unit в текущем типе простоя
        const existingItem = unitData[delayType].find(
            (existing) => existing.unitPart.unit.name === unitName
        );

        if (existingItem) {
            // Если найден, суммируем длительность
            existingItem.delta += deltaTime;
        } else {
            // Если не найден, добавляем новый элемент
            unitData[delayType].push({ ...item, delta: deltaTime });
        }

        // Инициализация суммарного времени для данного типа простоя
        if (!delaysSummary[delayType]) {
            delaysSummary[delayType] = 0;
        }

        // Обновление суммарного времени для данного типа простоя
        delaysSummary[delayType] += deltaTime;
    });

    const tables = Object.entries(unitData).map(
        ([delayType, tableData], tableIndex) => (
            <div key={`table-${tableIndex}`}>
                <h3>{delayType}</h3>
                <table
                    className="table table-striped table-bordered table-hover table-auto table-light"
                    id={`gypsumBoardTable-${tableIndex}`}
                >
                    <thead className="table-dark">
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
                            <td>{item.delta}</td>
                        </tr>
                    ))}
                    {/* Добавляем промежуточные итоги для каждой таблицы */}
                    <tr key={`total-${tableIndex}`}>
                        <td>{delayType}</td>
                        <td colSpan={3}>Итого</td>
                        <td>{delaysSummary[delayType]}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    );

    return <div>{tables}</div>;
};

export default DelaysTable;
