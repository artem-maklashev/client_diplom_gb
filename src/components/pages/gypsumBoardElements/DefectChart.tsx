import BoardProduction from "../../../model/production/BoardProduction";
import {Tooltip, AreaChart, YAxis, CartesianGrid, XAxis, Area} from "recharts";
import React from "react";

// Класс для представления данных
class ChartData {
    pDate: Date;
    value: number;
    totalValue: number;
    defectsPresent: number;


    constructor(pDate: Date, value: number, totalValue: number, defectsPercent: number) {
        this.pDate = pDate;
        this.value = value;
        this.totalValue = totalValue;
        this.defectsPresent = defectsPercent;

    }

}

interface BoardProductionProps {
    data: BoardProduction[];
}

const DefectChart: React.FC<BoardProductionProps> = ({data}) => {
        if (data.length === 0) {
            return <div>Данных нет</div>;
        } else {
            data =data.sort((a, b) => (a.productionList.productionDate < b.productionList.productionDate ? -1 : 1));
            console.log("Получены данные в размере " + data.length);
             const defectData = data.filter(
                (item) => item.gypsumBoardCategory.id <= 3);
             console.log("Преобразованные данные " + defectData.length );


            let data1: ChartData[] = [];

            defectData.forEach((production) => {

                    const existingData = data1.find((item) => {
                        return item.pDate === production.productionList.productionDate;
                    });
                    if (existingData) {
                        // Если данные существуют, добавьте значение к существующему значению
                        if (production.gypsumBoardCategory.id === 2 || production.gypsumBoardCategory.id === 3) {
                            existingData.value += production.value;
                        } else {
                            existingData.totalValue += production.value;
                        }
                    } else {
                        // Если данных нет, создайте новый объект ChartData и добавьте его в массив
                        let newData: ChartData;
                        if (production.gypsumBoardCategory.id === 2 || production.gypsumBoardCategory.id === 3) {
                            newData = new ChartData(production.productionList.productionDate, production.value, 0, 0);
                        } else {
                            newData = new ChartData(production.productionList.productionDate, 0, production.value, 0);
                        }
                        data1.push(newData);
                    }
                    console.log("Получены данные в размере " + data1.length);
                }
            );

            data1.forEach(value => value.defectsPresent = (value.totalValue - value.value) * 100 / value.totalValue);
            console.log("Получены данные в размере " + data1.length + " Первые данные\n" +
                " pDate=" + data1[0].pDate +
                " total=" + data1[0].totalValue +
                " value=" + data1[0].value +
                " defectsPresent=" + data1[0].defectsPresent);

//цвета секторов диаграммы
// const COLORS = ['#0088FE', '#00C49F', '#282cff', '#370548'];
            return (
                <div className="container">
                    <div style={{width: "100%", height: "100%"}}>
                        <AreaChart width={730} height={250} data={data1}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            {/*{defectData[0].pList.id}*/}

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
                            <XAxis dataKey="pDate"/>
                            <YAxis dataKey="defectsPresent"/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Area type="monotone" dataKey="defectsPresent" stroke="#8884d8" fillOpacity={1}
                                  fill="url(#colorUv)"/>
                        </AreaChart>
                    </div>
                </div>
            );
        }
};

export default DefectChart;
