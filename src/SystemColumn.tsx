import { Col } from 'react-bootstrap';
import SystemCard from './SystemCard';

interface ColProps {
    systemType: string;
    data: {
        name: string;
        system_type: string;
    }[];
}

export default function SystemColumn ({systemType, data}: ColProps) {
    const filteredData = data.filter(item => item.system_type === systemType);
    const pluralizedHeading = systemType += "s"; // I can get away with this here, but in "real life" it'd be better to let a library handle this just in case
    return <Col className='d-flex flex-column align-items-center mb-4'>
        <h1>{pluralizedHeading}</h1>
        <div className='d-flex flex-column align-items-center' style={{width: '100%'}}>
            {filteredData.map((item, index) => <SystemCard system={item.name} key={index}/>)}
        </div>
    </Col>
}