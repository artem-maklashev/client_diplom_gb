import React, {useCallback, useEffect, useState} from 'react';
import GypsumBoardInputData from "../../model/inputData/GypsumBoardInputData";
import GypsumBoardTable from "./GypsumBoardTable";
import GypsumBoardChart from './gypsumBoardElements/GypsumBoardChart';

interface GypsumBoardShowProps {
}

const GypsumBoardShow: React.FC<GypsumBoardShowProps> = (props) => {
    const [gypsumBoardData, setGypsumBoardData] = useState<GypsumBoardInputData[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<string>(getCurrentDate()); // Set initial date to today
    const [selectedEndDate, setSelectedEndDate] = useState<string>(getCurrentDate()); // Set initial date to today

    const fetchGypsumBoardData = useCallback(async () => {
        try {

            const params = new URLSearchParams({
                startDate: selectedStartDate,
                endDate: selectedEndDate
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
        }
    }, [selectedStartDate, selectedEndDate]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchGypsumBoardData();
        };

        fetchData();
    }, [selectedStartDate, selectedEndDate, fetchGypsumBoardData]);


    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredDate = event.target.value;
        console.log(enteredDate)
        if (event.target.id === "startDateInput") {
            setSelectedStartDate(enteredDate);
            console.log("УСТАНОВЛЕНА НОВАЯ НАЧАЛЬНАЯ ДАТА")
            setErrorText(null); // Clear any previous error message
        } else if (event.target.id === "endDateInput") {
            setSelectedEndDate(enteredDate);
            console.log("УСТАНОВЛЕНА НОВАЯ КОНЕЧНАЯ ДАТА")
            setErrorText(null); // Clear any previous error message
        } else {
            // Handle invalid date
            setErrorText(`Invalid date format. Please use ${getLocalizedDateFormat()}.`);
        }
    };

    // Function to get the current date in YYYY-MM-DD format (required by input type="date")
    function getCurrentDate(): string {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = now.getUTCDate().toString().padStart(2, '0');

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
                <div className="row">
                    <div className="col-md-6 mb-3 mx-auto">
                        <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Дата начала
              </span>
                            <input
                                type="date"
                                id="startDateInput"
                                value={selectedStartDate}
                                onChange={handleDateChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3 mx-auto">
                        <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Дата окончания
              </span>
                            <input
                                type="date"
                                id="endDateInput"
                                value={selectedEndDate}
                                onChange={handleDateChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className='row'>

            {errorText && <div className="error-message">{errorText}</div>}
                <div className='col-6'>
                    <GypsumBoardTable data={gypsumBoardData} />

                </div>
                <div className='col-6'>
                    <GypsumBoardChart raw_data={gypsumBoardData} />

                </div>
                
            </div>
                   
          
            
        </div>
    );
};

export default GypsumBoardShow;
