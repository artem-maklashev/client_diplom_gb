import BoardDefectsLog from "../../../model/defects/BoardDefectsLog";
import DefectsDataPrepare from "./DefectsDataPrepare";
import {Table} from "react-bootstrap";


interface DefectsTableProps {
    data: BoardDefectsLog[];
}

const DefectsTable: React.FC<DefectsTableProps> = ({data}) => {
    if (data.length === 0) {
        return <div>Данных нет</div>;
    }

    const preparedDefects = new DefectsDataPrepare(data);
    const summaryDefects = preparedDefects.getSummary();


    const mainTable = (
        <Table striped bordered hover variant="light">
            <thead className="table-dark">
            <tr>
                <th>Тип брака</th>
                <th colSpan={2}>Количество</th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(summaryDefects).map(([defectType, count], index) => (
                <tr key={defectType}>
                    <td>{defectType}</td>
                    <td>{count.toFixed(0)}</td>
                    <td className="col-2">
                        <div className="progress ">
                            <div className="progress-bar "
                                 style={{width: `${(count / summaryDefects[Object.keys(summaryDefects)[0]]) * 100}%` }}>



                            </div>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
            <tbody className="table-dark">
            <tr>
                <td>Итого:</td>
                <td colSpan={2}>
                    <strong>{Object.values(summaryDefects).reduce((acc, value) => acc + value, 0).toFixed(2)}</strong>
                </td>
            </tr>
            </tbody>
        </Table>
    );

    return  <div>{mainTable}</div>;

};
export default DefectsTable;
