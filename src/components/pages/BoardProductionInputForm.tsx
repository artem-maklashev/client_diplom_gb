import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DateInput from "./boardProductionInput/DateInput";

const BoardProductionInputForm: React.FC = () => {
    const handleDatesChange = (startDate: string, endDate: string) => {
        // Do something with the startDate and endDate values, e.g., store them in state
        console.log("Selected start date:", startDate);
        console.log("Selected end date:", endDate);
    };

    return (
        <Container className="container-fluid p-0">
            <Row className="mt-5">
                <Col className="col-6">
                    <DateInput onDatesChange={handleDatesChange} />
                </Col>
            </Row>
        </Container>
    );
};

export default BoardProductionInputForm;
