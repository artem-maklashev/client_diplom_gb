import React, { useEffect, useState } from 'react';

function GypsumBoard() {
    const [gypsumBoardData, setGypsumBoardData] = useState<GypsumBoard[]>([]);

    type GypsumBoard = {
        types: string;
        tradeMark: string;
        boardType: string;
        edge: string;
        thickness: string;
        width: string;
        length: string;
    };

    async function fetchGypsumBoardData(): Promise<void> {
        try {
            const response = await fetch(
              "https://run.mocky.io/v3/ad5659b1-1ad1-4bde-afec-362279596a10"
            );

            if (!response.ok) {
                throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
            }

            const data: GypsumBoard[] = await response.json();
            setGypsumBoardData(data);
        } catch (error) {
            console.error(`Произошла ошибка: ${error}`);
        }
    }

    useEffect(() => {
        fetchGypsumBoardData();
    }, []);

    return (
      <div>
        <form action="/api/v1/orders" method="post">
          <input type="month" name="date" />
          <input type="submit" value="Отправить" />
        </form>
        <div className="table-responsive">
          <table className="table table-primary" id="gypsumBoardTable">
            <thead>
              <tr>
                <th>Тип</th>
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
                  <td>{item.types}</td>
                  <td>{item.tradeMark}</td>
                  <td>{item.boardType}</td>
                  <td>{item.edge}</td>
                  <td>{item.thickness}</td>
                  <td>{item.width}</td>
                  <td>{item.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default GypsumBoard;
