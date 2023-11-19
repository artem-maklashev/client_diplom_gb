import GypsumBoardInputData from "../../../model/inputData/GypsumBoardInputData";
import {
    BarChart,
    Bar,

    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
    LabelList
} from 'recharts';
interface GypsumBoardTableProps {
    raw_data: GypsumBoardInputData[];
}

const GypsumBoardChart: React.FC<GypsumBoardTableProps> = ({raw_data}) => {
    const data = raw_data.sort((a, b) => (a.factValue > b.factValue ? -1 : 1));

    return (
        <div className="container">
            <div style={{width: '100%', height: '100%'}}>
                {/*<ResponsiveContainer width="100%" height="100%">*/}
                    <BarChart
                        width={800}
                        height={900}
                        data={data}
                        layout="vertical"

                        margin={{top: 5, right: 45, bottom: 20, left: 10}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis type="number" dataKey="factValue"  hide/>
                        <YAxis type="category" dataKey="boardTitle"
                               tick={{stroke: 'black', strokeWidth: 0.5, fontSize: 12}} width={250}/>
                        <Tooltip/>
                        <Legend verticalAlign="top" height={36}/>
                        <Bar dataKey="factValue" fill="#3498db" animationDuration={500}>
                            <LabelList
                                position="right"
                            />

                        </Bar>
                        <Bar dataKey="planValue" fill="grey">
                            <LabelList
                                position="right"
                            />
                        </Bar>
                    </BarChart>
                {/*</ResponsiveContainer>*/}
            </div>
        </div>
    );

}
export default GypsumBoardChart;