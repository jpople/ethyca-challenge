import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sampleData, { SystemInfo } from './assets/sampleData'; 
import SystemColumn from './SystemColumn';
import FilterInterface from './FilterInterface';

function App() {
  // remove duplicate systems
  const allData = [...new Map(sampleData.map(system => [system.fides_key, system])).values()];
  // right now there's only one duplicate ("Orders Management") so I'm not exactly sure what the intended behavior is-- it might be fine to just display it twice, in which case this code could just be removed
  // here, I'm just checking uniqueness by the Fideslang key; more ideally, it would probably be nice to have a method that checked the whole system objects against each other to see if they're actually duplicates

  const [filteredData, setFilteredData] = useState(allData);
  const [activeFilter, setActiveFilter] = useState("");
  const [filterParam, setFilterParam] = useState("");

  const columnNames = ["Application", "Service", "Database", "Integration"]; // hardcoding this for now, but maybe should be filled programmatically like below if there are other system types we could care about in the future

  const getDataUseOptions = (data : SystemInfo[]) => {
    let options: string[] = [];
    data.forEach((system) => {
      system.privacy_declarations.forEach((dec) => {
        if (!options.includes(dec.data_use)) options.push(dec.data_use);
      })
    })
    return options;
  }

  const handleApplyFilter = () => {
    setFilteredData(filterData(filterParam));
    setActiveFilter(filterParam);
  }

  const handleUpdateFilterParams = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParam(event.target.value);
  }

  const filterData = (filter: string) => {
    if (filter === "") {
      return allData;
    }
    else {
      let result = allData.filter((system) => {
        return system.privacy_declarations.some((dec) => dec.data_use === filter);
      })
      return result;
    }
  }

  return (
    <Container fluid>
      <Row style={{textAlign: 'center'}}>
        <h1>Records of Processing Activities</h1>
        {/* TODO: update text with links and stuff */}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </Row>
      <FilterInterface 
        onApply={handleApplyFilter}
        dataUseOptions={getDataUseOptions(allData)}
        filterParam={filterParam}
        onChange={handleUpdateFilterParams}
      />
      <Row style={{textAlign: 'center'}}>
        <p><i>Showing systems that use data for: {activeFilter === "" ? "Any" : <code>{activeFilter}</code>}</i></p>
      </Row>
      <Row xs={1} sm={2} lg={4}>
        {columnNames.map((columnName) => <SystemColumn systemType={columnName} data={filteredData} key={columnName}/>)}
      </Row>
    </Container>
  )
}

export default App
