import React, {useCallback, useState} from "react";
import Plan from "../../model/gypsumBoard/Plan";
import {Col, Container, Row} from "react-bootstrap";

interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = () => {
    const [boardPlanData, setBoardPlanData] = React.useState<Plan[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);
    const planDate = () => {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = now.getUTCDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const fetchPlan = useCallback(async () => {
        try {
            // const params = new URLSearchParams(
            //     {planDate: planDate()}
            // );

            // const response = await fetch(`${process.env.REACT_APP_API_URL}/planData?${params.toString()}`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/planData`);
            if (!response.ok) {
                throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
            }

            const data: Plan[] = await response.json();
            setErrorText(null);
            setBoardPlanData(data);
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            setErrorText(error.message);
            setBoardPlanData([]);
        }
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            await fetchPlan();
        };

        fetchData();
    }, [fetchPlan]);
    // alert("Получены данные по плану в размере " + boardPlanData.length);
    const plan = boardPlanData.reduce((acc, plan) => acc + (plan.planValue), 0);




    return (
        <Row>
            <Container>
                <Row className="mt-5">
                    <Col className="mt-3">
                        <h3>План на текущий месяц</h3>
                        <p> {plan}</p>
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}
export default MainPage;