import React, {useCallback, useEffect, useState} from 'react';
import GypsumBoardInputData from "../../model/inputData/GypsumBoardInputData";
import GypsumBoardTable from "./gypsumBoardElements/GypsumBoardTable";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import './MyStyle.css'
import EdgeChart from "./gypsumBoardElements/EdgeChart";
import DefectChart from "./gypsumBoardElements/DefectChart";
import ThicknessChart from "./gypsumBoardElements/ThicknessChart";
import {useFetchProductionData} from "./commonElements/GetProductionData";
import TypesChart from './gypsumBoardElements/TypesChart';
import GypsumBoardChart from "./gypsumBoardElements/GypsumBoardChart";


interface GypsumBoardShowProps {
}

const GypsumBoardShow: React.FC<GypsumBoardShowProps> = () => {
    const [gypsumBoardData, setGypsumBoardData] = useState<GypsumBoardInputData[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<string>(getFirstDate()); // Set initial date to today
    const [selectedEndDate, setSelectedEndDate] = useState<string>(getCurrentDate()); // Set initial date to today
    // const [productionData, setProductionData] = useState<BoardProduction[]>([]);
    const {productionData,} = useFetchProductionData(selectedStartDate, selectedEndDate);
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
    // const fetchProductionData = useCallback(async () => {
    //     try {
    //         const params = new URLSearchParams({
    //             startDate: selectedStartDate,
    //             endDate: selectedEndDate
    //         });
    //
    //         const response = await fetch(`http://localhost:8080/api/allboard/production?${params.toString()}`);
    //
    //         if (!response.ok) {
    //             throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
    //         }
    //
    //         const data: BoardProduction[] = await response.json();
    //         setErrorText(null);
    //         console.log(data[0].productionList.id);
    //         setProductionData(data);
    //         console.log("Получены данные по выпуску продукции " + data.length);
    //     } catch (error: any) {
    //         console.error(`Произошла ошибка: ${error.message}`);
    //         setErrorText(error.message);
    //         setProductionData([]);
    //     }
    // }, [selectedStartDate, selectedEndDate]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchGypsumBoardData();
        };

        fetchData();
    }, [selectedStartDate, selectedEndDate, fetchGypsumBoardData]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetchProductionData();
    //     };
    //
    //     fetchData();
    // }, [selectedStartDate, selectedEndDate, fetchProductionData]);


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

    function getFirstDate(): string {

        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getUTCMonth() + 1, 1);
        const year = firstDay.getUTCFullYear();
        const month = (firstDay.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based


        return `${year}-${month}-01`;
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
        <div className="row mt-5 justify-content-center" style={{backgroundColor: '#b5b5b5'}}>
            <Container className="container mt-auto">
                <div className="row mt-5">
                    <div className="col-md-3 mb-3 mx-auto">
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
                        <div className="col-md-3 mb-3 mx-auto">
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
            </Container>


            {errorText && <div className="error-message">{errorText}</div>}
            <Container className="col-lg-11 mb-5 ">
                <Row className="p-4">
                    {/*<Col className="d-flex justify-content-center">*/}
                    {/*<Col className="lg-11 mb-5">*/}
                    <Tabs defaultActiveKey="table" id="uncontrolled-tab-example">
                        <Tab eventKey="table" title="Таблица">
                            {/*<Col className="d-flex justify-content-center">*/}
                            <Col className="d-flex justify-content-center">
                                <GypsumBoardTable data={gypsumBoardData}/>
                            </Col>
                            {/*</Col>*/}
                        </Tab>
                        <Tab eventKey="bar" title="График">
                            <Col className="col-12">
                                <Row className=" justify-content-center">
                                    <Col className="col-lg-4">
                                        <GypsumBoardChart raw_data={gypsumBoardData}/>
                                    </Col>
                                    <Col className="col-lg-4 ">
                                        <Row className="d-flex justify-content-center">
                                            <EdgeChart edgeData={productionData}/>
                                        </Row>
                                        <Row className="d-flex justify-content-center">
                                            <ThicknessChart edgeData={productionData}/>
                                        </Row>
                                    </Col>
                                    <Col className="col-lg-4 d-flex align-items-center">
                                        <TypesChart edgeData={productionData}/>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Col className="col-xxl">
                                        <DefectChart data={productionData}/>
                                    </Col>
                                </Row>
                            </Col>

                        </Tab>
                        <Tab eventKey="opinion" title="В разработке" disabled={true}>
                            В разработке...
                        </Tab>
                    </Tabs>
                    {/*</Col>*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </div>
    );
};

export default GypsumBoardShow;
