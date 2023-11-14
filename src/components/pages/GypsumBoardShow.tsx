import React, { useEffect, useState } from 'react';
import GypsumBoardInputData from "../../model/inputData/GypsumBoardInputData";
import GypsumBoardTable from "./GypsumBoardTable";

interface GypsumBoardShowProps {}

const GypsumBoardShow: React.FC<GypsumBoardShowProps> = (props) => {
    const [gypsumBoardData, setGypsumBoardData] = useState<GypsumBoardInputData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate()); // Set initial date to today

    const fetchGypsumBoardData = async () => {
        try {
            setIsLoading(true);
            const [year, month, day] = selectedDate.split('-');
            const params = new URLSearchParams({
                day: day,
                month: month,
                year: year,
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
    };

    useEffect(() => {
        // Update data only if the date is valid
        if (validateDate(selectedDate)) {
            fetchGypsumBoardData();
        }
    }, [selectedDate]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredDate = event.target.value;
        console.log(enteredDate)
        if (validateDate(enteredDate)) {
            setSelectedDate(enteredDate);
            console.log("УСТАНОВЛЕНА НОВАЯ ДАТА")
            setErrorText(null); // Clear any previous error message
        } else {
            // Handle invalid date
            setErrorText(`Invalid date format. Please use ${getLocalizedDateFormat()}.`);
        }
    };

    // Function to validate date format (DD-MM-YYYY)
    const validateDate = (date: string): boolean => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    // Function to get the current date in YYYY-MM-DD format (required by input type="date")
    function getCurrentDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Function to get the localized date format
    const getLocalizedDateFormat = (): string => {
        const exampleDate = new Date(2023, 0, 1); // January 1, 2023
        return exampleDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="container">
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Дата</span>
                    <input
                        type="date"
                        id="dateInput"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            {errorText && <div className="error-message">{errorText}</div>}
            <GypsumBoardTable data={gypsumBoardData} />
        </div>
    );
};

export default GypsumBoardShow;
