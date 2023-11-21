import BoardProduction from "../../../model/production/BoardProduction";
import {Pie, PieChart, Cell, Tooltip, Legend} from "recharts";

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

const EdgeChart: React.FC<BoardProductionProps> = ({ edgeData }) => {
    const data = edgeData.filter(
        (value) => value.gypsumBoardCategory.id === 2 || value.gypsumBoardCategory.id === 3
    );
    if  (data.length === 0) {
        return <div>Данных нет</div>;
    } else {
        console.log("Получены данные в размере " + data.length);
    }


    let data1: ChartData[] = [];

    data.forEach((value) => {
        const existingData = data1.find((item) => item.name === value.gypsumBoard.edge.name);

        if (existingData) {
            // Если данные существуют, добавьте значение к существующему значению
            existingData.value += value.value;
        } else {
            // Если данных нет, создайте новый объект ChartData и добавьте его в массив
            const newData = new ChartData(value.gypsumBoard.edge.name, value.value);
            data1.push(newData);
        }
    });
    //цвета секторов диаграммы
    const COLORS = ['#0088FE', '#00C49F', '#282cff', '#370548'];
    return (
        <div className="container">
            <div style={{ width: "100%", height: "100%" }}>
                <PieChart width={700} height={400} >
                    <Tooltip label="name>" />
                    <Legend name="name" verticalAlign="top"/>
                    <Pie
                        data={data1}
                        dataKey="value"
                        nameKey="name"

                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, value }) => `${name} » ${value}`}
                        animationDuration={500}
                    >
                        {data1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default EdgeChart;
