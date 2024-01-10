import React, {useCallback, useState} from "react";
import Plan from "../../model/gypsumBoard/Plan";
import {Card, Col, Row} from "react-bootstrap";
import ApiService from "../../service/ApiService";
import BoardProduction from "../../model/production/BoardProduction";


interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = () => {
    const [boardPlanData, setBoardPlanData] = React.useState<Plan[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [boardProductionData, setBoardProductionData] = React.useState<BoardProduction[]>([]);

    const fetchPlan = useCallback(async () => {
        try {
            const data = await ApiService.fetchTodayPlan();
            setErrorText(null);
            setBoardPlanData(data);
        } catch (error: any) {
            setErrorText(error.message);
            setBoardPlanData([]);
        }
    }, []);

    const fetchBoardProduction = useCallback(async () => {
        try {
            const data = await ApiService.fetchTodayBoardProduction();
            setErrorText(null);
            setBoardProductionData(data);
        } catch (error: any) {
            setErrorText(error.message);
            setBoardProductionData([]);
        }
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            await fetchPlan();
            await fetchBoardProduction();
        };

        fetchData();
    }, [fetchPlan, fetchBoardProduction]);

    const plan = boardPlanData.reduce((acc, plan) => acc + (plan.planValue), 0);
    const todayPlan = boardPlanData.filter(plan => plan.plan_date === new Date());
    const sortedBoardProduction = boardProductionData.filter(board => board.gypsumBoardCategory.id < 5);
    const { total, value, defectPercent } = sortedBoardProduction.reduce(
        (acc, board) => {
            const isCategory1 = board.gypsumBoardCategory.id === 1;
            acc.total += isCategory1 ? board.value : 0;
            acc.value += isCategory1 ? 0 : board.value;
            return acc;
        },
        { total: 0, value: 0, defectPercent: 0 }
    );

    const defectPercentResult = total === 0 ? 0 : ((total - value) / total) * 100;

    return (

                <Row className="mt-5 justify-content-center text-center" >
                <p></p>
                    <h2>Показатели за текущий месяц</h2>
                    <Col className="mt-3 col-lg-3 col-sm-12">
                        <Card className="text-center bg-body-secondary ">
                            <Card.Body>
                                <Card.Header className="mb-2"><h3>Производство ГСП</h3></Card.Header>
                                <Card.Subtitle>План на текущий месяц</Card.Subtitle>
                                <Card.Text>
                                    <p> {plan}</p>
                                </Card.Text>
                                <Card.Subtitle>Процент брака</Card.Subtitle>
                                <Card.Text>
                                    {defectPercentResult.toFixed(2)}%
                                </Card.Text>
                                <Card.Subtitle>Сегодня в производстве</Card.Subtitle>
                                {todayPlan.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Гипсокартон</th>
                                            <th>Количество</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {todayPlan.map(board => (
                                            <tr key={board.gypsum_board_id.toString()}>
                                                <td>{board.gypsum_board_id.toString()}</td>
                                                <td>{board.planValue}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>На сегодня производство не запланировано.</p>
                                )}
                            </Card.Body>


                        </Card>
                    </Col>
                </Row>


    );
}
export default MainPage;