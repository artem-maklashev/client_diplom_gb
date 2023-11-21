import BoardProduction from "../../../model/production/BoardProduction";
import {Pie, PieChart, Cell, Tooltip, Legend, AreaChart, YAxis, CartesianGrid, XAxis, Area} from "recharts";
import GypsumBoardCategory from "../../../model/gypsumBoard/GypsumBoardCategory";
import React from "react";

// Класс для представления данных
class ChartData {
    pDate: Date;
    value: number;
    total: number;
    defectsPresent: number;
    dateKey: string;

    constructor(pDate: Date, value: number, total: number, defectsPercent: number) {
        this.pDate = pDate;
        this.value = value;
        this.total = total;
        this.defectsPresent = defectsPercent;
        this.dateKey = this.formatDate(pDate);
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // добавляем ведущий ноль, если месяц < 10
        const day = String(date.getDate()).padStart(2, '0'); // добавляем ведущий ноль, если день < 10
        return `${year}-${month}-${day}`;
    }
}

interface BoardProductionProps {
    data: BoardProduction[];
}

const EdgeChart: React.FC<BoardProductionProps> = ({data}) => {
    const defectData = data.filter(
        (value) => value.gypsumBoardCategory.id >= 1 || value.gypsumBoardCategory.id <= 3
    );

    let data1: ChartData[] = [];

    data.forEach((value) => {
        const existingData = data1.find((item) => {
            return item.pDate !== undefined && value.pList !== undefined && value.pList.pDate !== undefined && item.pDate === value.pList.pDate;
        });
        if (existingData) {
            // Если данные существуют, добавьте значение к существующему значению
            if (value.gypsumBoardCategory.id === 2 || value.gypsumBoardCategory.id === 3) {
                existingData.value += value.value;
            } else {
                existingData.total += value.value;
            }
        } else {
            let newData: ChartData;
            // Если данных нет, создайте новый объект ChartData и добавьте его в массив
            if (value.gypsumBoardCategory.id === 2 || value.gypsumBoardCategory.id === 3) {
                if (value.pList && value.pList.pDate) {
                    newData = new ChartData(value.pList.pDate, value.value, 0, 0);
                } else {
                    // Обработка случая, когда productionDate не определено
                    newData = new ChartData(new Date(), value.value, 0, 0);
                }
            } else {
                if (value.pList && value.pList.pDate) {
                    newData = new ChartData(value.pList.pDate, 0, value.value, 0);
                } else {
                    // Обработка случая, когда productionDate не определено
                    newData = new ChartData(new Date(), 0, value.value, 0);
                }
            }
            data1.push(newData);
        }
    });

    data1.forEach(value => value.defectsPresent = (value.total-value.value)*100/value.total);
    //цвета секторов диаграммы
    // const COLORS = ['#0088FE', '#00C49F', '#282cff', '#370548'];
    return (
        <div className="container">

            <div style={{width: "100%", height: "100%"}}>
                <AreaChart width={730} height={250} data={data1}
                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    {data[0].pList.id}

                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        {/*<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">*/}
                        {/*    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>*/}
                        {/*    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>*/}
                        {/*</linearGradient>*/}
                    </defs>
                    <XAxis dataKey="pDate" />
                    <YAxis dataKey="defectsPresent"/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="defectsPresent" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </div>
        </div>
    );
};

export default EdgeChart;
