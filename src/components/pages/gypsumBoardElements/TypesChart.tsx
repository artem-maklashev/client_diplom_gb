import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer, BarChart, CartesianGrid, Bar, LabelList, XAxis, YAxis } from 'recharts';
import BoardProduction from "../../../model/production/BoardProduction";

// Класс для представления данных
class ChartData {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

interface BoardProductionProps {
    edgeData: BoardProduction[];
}

const TypesChart: React.FC<BoardProductionProps> = ({ edgeData }) => {
    const data = edgeData.filter(
        (value) =>
            value.gypsumBoardCategory.id === 2 ||
            value.gypsumBoardCategory.id === 3 ||
            value.gypsumBoardCategory.id === 4
    );
    if (data.length === 0) {
        return <div>Данных нет</div>;
    } else {
        console.log('Получены данные в размере ' + data.length);
    }

    let data1: ChartData[] = [];

    data.forEach((value) => {
        const existingData = data1.find((item) => item.name === value.gypsumBoard.boardType.name);

        if (existingData) {
            // Если данные существуют, добавьте значение к существующему значению
            existingData.value += value.value;
        } else {
            // Если данных нет, создайте новый объект ChartData и добавьте его в массив
            const newData = new ChartData(value.gypsumBoard.boardType.name, value.value);
            data1.push(newData);
        }
    });
    const data2 = data1.filter(item => item.value >= 0).sort((a, b) => b.value - a.value);
    
   
    return (
        <div className="col-12" style={{ width : "100%", height:"400px" }}>
            <h3 className="text-center">Тип ГСП</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data2}
                    layout="vertical"
                    margin={{ top: 5, right: 10, bottom: 20, left: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="value" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ stroke: 'black', strokeWidth: 0.5, fontSize: 12 }}
                        
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3498db" animationDuration={500}>
                        <LabelList position="right"
                            formatter={(value: number) => {
                                return value.toFixed(2) ;
                            }} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TypesChart;
