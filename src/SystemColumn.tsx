import { Col } from 'react-bootstrap';
import SystemCard from './SystemCard';
import { SystemInfo } from './assets/sampleData';

interface ColProps {
    systemType: string;
    data: SystemInfo[];
}

export default function SystemColumn ({systemType, data}: ColProps) {
    const filteredData = data.filter(item => item.system_type === systemType);
    const pluralizedHeading = systemType += "s"; // I can get away with this here, but in "real life" it'd be better to let a library handle this just in case
    return <Col className='d-flex flex-column align-items-center mb-4'>
        <h2>{pluralizedHeading}</h2>
        <div className='d-flex flex-column align-items-center' style={{width: '100%'}}>
            {filteredData.map((item, index) => <SystemCard system={item} key={index}/>)}
        </div>
    </Col>
}