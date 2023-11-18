

import { getValueByDataKey } from "recharts/types/util/ChartUtils";
import GypsumBoardInputData from "../../../model/inputData/GypsumBoardInputData";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { getIndexAxis } from "chart.js/dist/core/core.config";
// import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, LabelList, FunnelChart, Funnel } from 'recharts';



// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// )

interface GypsumBoardTableProps {
    raw_data: GypsumBoardInputData[];
}

const GypsumBoardChart: React.FC<GypsumBoardTableProps> = ({ raw_data }) => {
    // const calculateTotal = <K extends keyof GypsumBoardInputData>(property: K): number => {
    //     return data.reduce((total, item) => total + Number(item[property]), 0);
    // };

    // const calculatePercentageTotal = (): string => {
    //     const totalFact = calculateTotal('factValue');
    //     const totalTotal = calculateTotal('total');
    //     return totalTotal > 0 ? (((totalTotal - totalFact) * 100) / totalTotal).toFixed(2) + "%" : "0";
    // };
    const data = raw_data.sort((a, b) => (a.factValue > b.factValue ? -1 : 1));
    const labels = data.reduce((arr: string[], board) => {
        arr.push(board.boardTitle);
        return arr;
    }, []);

    const totals = data.reduce((arr: number[], board) => {
        arr.push(board.factValue);
        return arr;
    }, []);
    
    // const config = {
    //     type: 'bar',
    //     data,
    //     options: {
    //         indexAxis: 'y',
    //     }
    // };

    // const state = {
        
    //     labels: labels,
    //     datasets: [{
    //         axis: 'y',
    //         label: 'Фактический выпуск',
    //         backgroundColor: 'rgba(255,99,132,0.2)',
    //         borderColor: 'rgba(255,99,132,1)',
    //         borderWidth: 1,
    //         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //         hoverBorderColor: 'rgba(255,99,132,1)',
    //         data: totals
    //     }],
        
    // };

    return (
        // <Bar data={state} options={{
        //     indexAxis: 'y',
        //     plugins: {
        //         title: { display: false, text: "", font: { size: 12, family: 'rubik' } },
        //         legend: { display: false, position: 'right' }
        //     },
        //     maintainAspectRatio: false
        // }} />
        <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={800}
            height={900}
            data={data}
            layout="vertical"
            // barSize={25}
            margin={{
                top: 35, right: 5, bottom: 5, left: 5
            }}>
            <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type='number' dataKey="factValue" hide   />
                    <YAxis type="category" dataKey="boardTitle" tick={{ stroke: 'black', strokeWidth: 0.5, fontSize: 12 }} width={250}  />
            <Tooltip />
            <Legend />
            <Bar dataKey="factValue" fill="#8884d8" >
                <LabelList dataKey="factValue" position="end"   />
            </Bar> 
        </BarChart> 
                {/* <FunnelChart width={730} height={250}>
                    <Tooltip />
                    <Funnel
                        dataKey="factValue"
                        data={data}
                        isAnimationActive
                    >
                        <LabelList position="top" fill="#000" stroke="none" dataKey="boardTitle" width={350} />
                    </Funnel>
                </FunnelChart> */}
            </ResponsiveContainer>
            </div>
    );
    
}
export default GypsumBoardChart;