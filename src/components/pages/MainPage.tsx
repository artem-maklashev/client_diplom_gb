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

    const sortedBoardProduction = boardProductionData.filter(board => board.gypsumBoardCategory.id < 5);
    const todayPlan = boardPlanData.filter(plan => plan.planDate === getCurrentDate());
    const toTodayPlan = boardPlanData.filter(plan => new Date(plan.planDate) < new Date(getCurrentDate()))
        .reduce((acc, plan) => acc + (plan.planValue), 0);

    const {total, value} = sortedBoardProduction.reduce(
        (acc, board) => {
            const isCategory1 = board.gypsumBoardCategory.id === 1;
            // acc.total += isCategory1 ? board.value : 0;
            // acc.value += isCategory1 ? 0 : board.value;
            if (isCategory1) {
                acc.total += board.value;
            } else {
                acc.value += board.value;
            }
            return acc;
        },
        {total: 0, value: 0}
    );

    const total2 = boardProductionData.filter(board => board.gypsumBoardCategory.id === 1); //.reduce((acc, production) => acc + production.value, 0);


    const defectPercentResult = total === 0 ? 0 : ((total - value) / total) * 100;

    function getCurrentDate(): string {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = now.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    return (

        <Row className="mt-5 justify-content-center text-center">
            <p></p>
            <h2>Показатели за текущий месяц</h2>
            <Col className="mt-3 col-lg-3 col-sm-12">
                <Card className="text-center bg-body-secondary ">
                    <Card.Body>
                        <Card.Header className="mb-2"><h3>Производство ГСП</h3></Card.Header>
                        <Card.Subtitle>План на текущий месяц</Card.Subtitle>
                        <Card.Text>
                            <p> {plan}м²</p>
                        </Card.Text>
                        <Card.Subtitle>Отклонение</Card.Subtitle>
                        <Card.Text>
                            {(value - toTodayPlan).toFixed(0)} м²
                        </Card.Text>
                        <Card.Subtitle>Процент брака</Card.Subtitle>
                        <Card.Text>

                             {defectPercentResult.toFixed(2)}%
                        </Card.Text>
                        <Card.Subtitle>Сегодня в производстве</Card.Subtitle>
                        {todayPlan.length > 0 ? (
                            <table className="table table-sm mt-1 table-striped table-bordered">
                                <thead className="table-dark">
                                <tr>
                                    <th>Гипсокартон</th>
                                    <th>Количество</th>
                                </tr>
                                </thead>
                                <tbody>
                                {todayPlan.map(board => (
                                    <tr key={board.gypsumBoard.id}>
                                        <td>{board.gypsumBoard.tradeMark.name + " тип " + board.gypsumBoard.boardType.name + "-" + board.gypsumBoard.edge.name + " "
                                            + board.gypsumBoard.thickness.value + "-" + board.gypsumBoard.width.value + "-" + board.gypsumBoard.length.value}</td>
                                        <td>{board.planValue} м²</td>
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
            <Col className="mt-3 col-lg-3 col-sm-12">
                <Card className="text-center bg-body-secondary ">
                    <Card.Body>
                        <Card.Header className="mb-2"><h3>Производство ГВ</h3></Card.Header>
                        <Card.Subtitle>План на текущий месяц</Card.Subtitle>
                        <Card.Text>
                            В разработке
                        </Card.Text>

                        <Card.Subtitle>Сегодня в производстве</Card.Subtitle>
                        {todayPlan.length > 0 ? (
                            <table className="table table-sm mt-1 table-striped table-bordered border-2">
                                <thead className="table-dark">
                                <tr>
                                    <th>Вид гипса</th>
                                    <th>Количество</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/*{todayPlan.map(board => (*/}
                                {/*    <tr key={board.gypsumBoard.id}>*/}
                                {/*        <td>{board.gypsumBoard.tradeMark.name + " тип " + board.gypsumBoard.boardType.name + "-" + board.gypsumBoard.edge.name + " "*/}
                                {/*            + board.gypsumBoard.thickness.value + "-" + board.gypsumBoard.width.value + "-" + board.gypsumBoard.length.value}</td>*/}
                                {/*        <td>{board.planValue}</td>*/}
                                {/*    </tr>*/}
                                {/*))}*/}
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