import React, {useCallback, useEffect, useState} from "react";
import Delays from "../../model/delays/Delays";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import DelaysTable from "./delaysElements/DelaysTable";

interface DelaysShowProps {
}



const DelaysShow: React.FC<DelaysShowProps> = (props) => {
    const [delaysData, setDelaysData] = useState<Delays[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<string>(getFirstDate()); // Set initial date to today
    const [selectedEndDate, setSelectedEndDate] = useState<string>(getCurrentDate()); // Set initial date to today


    const fetchDelaysData = useCallback(async () => {
        try {


            const params = new URLSearchParams({
                startDate: selectedStartDate,
                endDate: selectedEndDate

            });

            const response = await fetch(`http://localhost:8080/api/allboard/delays?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
            }

            const data: Delays[] = await response.json();
            setErrorText(null);
            setDelaysData(data);
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            setErrorText(error.message);
            setDelaysData([]);
        }
    }, [selectedStartDate, selectedEndDate]);


    useEffect(() => {
        const fetchData = async () => {
            await fetchDelaysData();
        };

        fetchData();
    }, [selectedStartDate, selectedEndDate, fetchDelaysData]);


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
        <div className="row mt-5" style={{ backgroundColor: '#b5b5b5' }}>
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
            <Container>
                <Row xs={1} md={1} lg={1}>
                    <Col className="d-flex justify-content-center">
                        <div className="col-lg-11 ">
                            <Tabs defaultActiveKey="table" id="uncontrolled-tab-example" >
                                <Tab eventKey="table" title="Таблица">
                                    <Col className="d-flex justify-content-center">
                                        <div className="col-sm-10 ">
                                            <DelaysTable data={delaysData}/>
                                        </div>
                                    </Col>
                                </Tab>
                                <Tab eventKey="bar" title="График">

                                    <Container>
                                        <Row>
                                            {/*<Col className="col-lg-6">*/}
                                            {/*    <DelaysChart raw_data={delaysData}/>*/}
                                            {/*</Col>*/}
                                            {/*<div className="col-xxl-6 ">*/}
                                            {/*    <div className="row d-flex justify-content-center">*/}
                                            {/*        <EdgeChart edgeData={productionData}/>*/}
                                            {/*    </div>*/}
                                            {/*    <div className="row d-flex justify-content-center">*/}
                                            {/*        <ThicknessChart edgeData={productionData}/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-xxl">*/}
                                            {/*    <div className="row d-flex justify-content-center">*/}
                                            {/*        <DefectChart data={productionData}/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </Row>
                                    </Container>

                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                </Tab>
                                <Tab eventKey="opinion" title="В разработке" disabled={true}>
                                    В разработке...
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DelaysShow;
