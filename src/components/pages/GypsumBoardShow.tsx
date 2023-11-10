import React, {useCallback, useEffect, useState} from 'react';
import GypsumBoard from "../../model/gypsumBoard/GypsumBoard";


function GypsumBoardShow() {
    const [gypsumBoardData, setGypsumBoardData] = useState<GypsumBoard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorText, setErrorText] = useState<string | null>(null);

    let monthIndex: number = 3;
    let year: number = 2023;

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

            const data = await response.json();
            setErrorText(null);
            setGypsumBoardData(data);
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            setErrorText(error.message);
            setGypsumBoardData([]); // Set an empty array in case of an error
        } finally {
            setIsLoading(false);
        }
    }, [monthIndex, year]);

    useEffect(() => {
        fetchGypsumBoardData();
    }, [fetchGypsumBoardData]);

    return (
        <div className="table-responsive-lg">
            {/*{isLoading ? (*/}
            {/*    <p>Loading...</p>*/}
            {/*) : errorText ? (*/}
            {/*    <p>Error: {errorText}</p>*/}
            {/*) : (*/}
                <table className="table table-striped table-bordered" id="gypsumBoardTable">
                    <thead className="table-dark">
                    <tr>
                        {/*<th>Тип</th>*/}
                        <th>Торговая марка</th>
                        <th>Тип плиты</th>
                        <th>Кромка</th>
                        <th>Толщина</th>
                        <th>Ширина</th>
                        <th>Длина</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gypsumBoardData.map((item, index) => (
                        <tr key={index}>
                            {/*<td>{(item.pType.name)}</td>*/}
                            <td>{(item.tradeMark.name)}</td>
                            <td>{(item.boardType.name)}</td>
                            <td>{(item.edge.name)}</td>
                            <td>{(item.thickness.value)}</td>
                            <td>{(item.width.value)}</td>
                            <td>{(item.length.value)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            {/*)}*/}
        </div>
    );
}

export default GypsumBoardShow;
