import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { SystemInfo } from './assets/sampleData';

interface CardProps {
    system: SystemInfo;
}

function SystemCard({ system }: CardProps) {
    const parseDataCategoryLabel = (label: string) => {
        // gets the most specific item from a Fideslang label; e.g. "user.derived.identifiable.location" → "location"
        return label.split(".").pop();
    }

    const parseCategories = (sys: SystemInfo) => {
        // filters duplicates and gets the list of data categories from the system
        let result: string[] = [];
        sys.privacy_declarations.forEach((dec) => {
            dec.data_categories.forEach((category) => {
                let name = parseDataCategoryLabel(category);
                if (name !== undefined && !result.includes(name)) {
                    result.push(name);
                }
            })
        })
        return result;
    }

    return <Card className="m-2" style={{width: '100%'}}>
        <Card.Body>
            <Card.Title>{system.name}</Card.Title>
            <Card.Subtitle style={{color: 'gray'}}>{system.fides_key}</Card.Subtitle>
            <Card.Text className="mt-1">{system.description}</Card.Text>
            {parseCategories(system).length > 0 && <>
                <h6>Data collected:</h6>
                <ListGroup>
                    {parseCategories(system).map((category, idx) => {
                        return <ListGroupItem key={idx}><code>{category}</code></ListGroupItem>
                    })}
                </ListGroup>
            </>}
        </Card.Body>
    </Card>;
}

export default SystemCard;