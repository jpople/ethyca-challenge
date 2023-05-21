import { Row, Col, Form, Button } from "react-bootstrap";

interface FilterInterfaceProps {
    onApply: Function;
    dataUseOptions: string[];
    filterParam: string;
    onChange: Function;
}

export default function FilterInterface({onApply, dataUseOptions, filterParam, onChange}: FilterInterfaceProps) {
    return <Row className="mb-3 justify-content-center">
        <Col xs="auto">
            <Form.Label>Filter by data use:</Form.Label>
            <Form.Select onChange={(event) => onChange(event)} value={filterParam}>
                <option value="">All</option>
                {dataUseOptions.map((opt) => <option value={opt} key={opt}>{opt}</option>)}
            </Form.Select>
        </Col>
        <Col xs="auto" className="d-flex align-items-end">
            <Button onClick={() => onApply()}>Apply filter</Button>
        </Col>
    </Row>
}