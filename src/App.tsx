// import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sampleData from './assets/sampleData'; 
import SystemColumn from './SystemColumn';

function App() {
  const columnNames = ["Application", "Service", "Database", "Integration"]; // can fill this programmatically at some point

  return (
    <Container fluid>
      <Row xs={1} sm={2} lg={4}>
        {columnNames.map((columnName) => <SystemColumn systemType={columnName} data={sampleData} key={columnName}/>)}
      </Row>
    </Container>
  )
}

export default App
