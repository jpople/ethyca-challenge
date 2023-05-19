import { Card } from 'react-bootstrap';

interface CardProps {
    system: string;
}

function SystemCard({ system }: CardProps) {
    return <Card className="m-2" style={{width: '100%'}}>
        {system}
    </Card>;
}

export default SystemCard;