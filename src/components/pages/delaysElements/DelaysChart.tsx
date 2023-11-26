import React from "react";
import Delays from "../../../model/delays/Delays";
import DalayDataPrepare from "./DalayDataPrepare";
import {Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Row} from "react-bootstrap";
import UnitPart from "../../../model/delays/UnitPart";

interface DelaysChartProps {
    delays_data: Delays[];
}

const DelaysChart: React.FC<DelaysChartProps> = ({delays_data}) => {
    const preparedData = new DalayDataPrepare(delays_data).getSummary();
    const summaryDelays = preparedData.delaysSummary;
    const summary: [delayType: string, delay: number][] = Object.entries(summaryDelays);
    const unitDelays = (preparedData.unitData);
    console.log('Summary', summary);
    return(
        <Row>
            <div className="col" style={{width: '100%', height: '300px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={summary}
                        layout="vertical"
                        margin={{ top: 5, right: 100, bottom: 20, left: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey={entry => entry[1]} /> {/* Use entry[1] for the delay value */}
                        <YAxis
                            type="category"
                            dataKey={entry => entry[0]} // Use entry[0] for the delay type
                            tick={{ stroke: 'black', strokeWidth: 0.5, fontSize: 12 }}
                            width={200}
                        />
                        <Tooltip />
                        {/*<Legend verticalAlign="top" height={36} />*/}
                        <Bar dataKey={entry => entry[1]} fill="#3498db" animationDuration={500}>
                            <LabelList position="right" />
                        </Bar>
                        {/* ... rest of your Bar components */}
                    </BarChart>
                </ResponsiveContainer>
                <div>
                    {Object.entries(unitDelays).map(
                        ([delayType, tableData], tableIndex) => (
                            <Row>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={tableData}
                                        layout="vertical"
                                        margin={{ top: 5, right: 100, bottom: 20, left: 10 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" dataKey={"delta"} /> {/* Use entry[1] for the delay value */}
                                        <YAxis
                                            type="category"
                                            dataKey={"unitPart.name"} // Use entry[0] for the delay type
                                            tick={{ stroke: 'black', strokeWidth: 0.5, fontSize: 12 }}
                                            width={200}
                                        />
                                        <Tooltip />
                                        {/*<Legend verticalAlign="top" height={36} />*/}
                                        <Bar dataKey={entry => entry[1]} fill="#3498db" animationDuration={500}>
                                            <LabelList position="right" />
                                        </Bar>
                                        {/* ... rest of your Bar components */}
                                    </BarChart>
                                </ResponsiveContainer>
                        </Row>
                    ))}
                </div>
            </div>
        </Row>

    );
}
export default DelaysChart;