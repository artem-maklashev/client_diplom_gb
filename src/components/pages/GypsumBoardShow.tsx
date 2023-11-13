import React, { useCallback, useEffect, useState } from 'react';
import GypsumBoardInputData from "../../model/inputData/GypsumBoardInputData";
import GypsumBoardTable from "./GypsumBoardTable";

interface GypsumBoardShowProps {}

const GypsumBoardShow: React.FC<GypsumBoardShowProps> = (props) => {
    const [gypsumBoardData, setGypsumBoardData] = useState<GypsumBoardInputData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [monthIndex, setMonthIndex] = useState<number>(4); // начальное значение месяца
    const [year, setYear] = useState<number>(2023); // начальное значение года

    const fetchGypsumBoardData = useCallback(async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams({
                month: monthIndex.toString(),
                year: year.toString(),
            });

            const response = await fetch(`http://localhost:8080/api/allboard?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
            }

            const data: GypsumBoardInputData[] = await response.json();
            setErrorText(null);
            setGypsumBoardData(data);
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            setErrorText(error.message);
            setGypsumBoardData([]);
        } finally {
            setIsLoading(false);
        }
    }, [monthIndex, year]);

    useEffect(() => {
        fetchGypsumBoardData();
    }, [fetchGypsumBoardData]);
    const calculateTotal = <K extends keyof GypsumBoardInputData>(data: GypsumBoardInputData[], property: K): number => {
        return data.reduce((total, item) => total + Number(item[property]), 0);
    };

    const calculatePercentageTotal = (data: GypsumBoardInputData[]): string => {
        const totalFact = calculateTotal(data, 'factValue');
        const totalTotal = calculateTotal(data, 'total');
        return totalTotal > 0 ? (((totalTotal - totalFact) * 100) / totalTotal).toFixed(2) + "%" : "---";
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonthIndex(parseInt(event.target.value, 10));
        fetchGypsumBoardData();
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(parseInt(event.target.value, 10));
        fetchGypsumBoardData();
    };

    // ... остальной код остается без изменений

    return (
        <div className="container">
            <div>
                <label htmlFor="monthInput">Месяц:</label>
                <input
                    type="month"
                    id="monthInput"
                    value={`${year}-${monthIndex.toString().padStart(2, '0')}`}
                    onChange={handleMonthChange}
                />
            </div>
            <div>
                <label htmlFor="yearInput">Год:</label>
                <input
                    type="number"
                    id="yearInput"
                    value={year}
                    onChange={handleYearChange}
                />
            </div>
            {/* Вместо прорисовки таблицы здесь используем GypsumBoardTable */}
            <GypsumBoardTable data={gypsumBoardData} />
        </div>
    );
};

export default GypsumBoardShow;
