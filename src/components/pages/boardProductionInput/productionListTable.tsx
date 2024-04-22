import React from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import ProductionList from "../../../model/production/ProductionList"

interface ProductionListTableProps {
    productionList: ProductionList[]
    
}

const ProductionListTable: React.FC<ProductionListTableProps> = ({ productionList }) => {
    return (
        <Container>
            <Row>
            <Col className="col-6">
                

            <Table striped bordered hover size="sm" variant="light">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Дата начала работы</th>
                        <th className="text-center">Дата окончания работы</th>
                        <th className="text-center">Дата производства</th>
                        <th className="text-center">Смена</th>
                        <th className="text-center">Вид продукции</th>
                    </tr>
                </thead>
                <tbody>
                    {productionList.map((item) => (
                        <tr key={item.id}>
                            <td><span>{item.id}</span></td>
                            <td><span>{new Date(item.productionStart).toLocaleString()}</span></td>
                            <td><span>{new Date(item.productionFinish).toLocaleString()}</span></td>
                            <td><span>{new Date(item.productionDate).toLocaleDateString()}</span></td>
                            <td>{item.shift.name}</td>
                            <td><span>{item.type.name}</span></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Col>
            </Row>
        </Container>
    );
}
export default ProductionListTable;