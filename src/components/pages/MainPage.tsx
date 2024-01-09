import React, {useCallback, useState} from "react";
import Plan from "../../model/gypsumBoard/Plan";
import {Col, Container} from "react-bootstrap";

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
            const params = new URLSearchParams(
                {planDate: planDate()}
            );

            const response = await fetch(`${process.env.REACT_APP_API_URL}/planData?${params.toString()}`);

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
    }, [planDate]);

    React.useEffect(() => {
        const fetchData = async () => {
            await fetchPlan();
        };

        fetchData();
    }, [planDate, fetchPlan]);
    const plan = boardPlanData.reduce((acc, plan) => acc + plan.value, 0);

    return (
        <Container>
            <Col className="mt-3">
                <h1>План на текущий месяц</h1>
                <p> {plan}</p>
            </Col>
        </Container>
    );
}
export default MainPage;