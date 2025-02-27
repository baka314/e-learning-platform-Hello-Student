import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Card, Row } from 'react-bootstrap';
import './SpecializationBar.css';

const SpecializationBar = observer(() => {
    const { course } = useContext(Context);

    return (
        <Row style={{ margin: '0' }}> {/* Отключаем центрирование */}
            {course.specializations.map(specialization => (
                <Card
                    key={specialization.id}
                    className={`specialization-card ${specialization.id === course.selectedSpecialization.id ? 'active' : ''}`}
                    onClick={() => course.setSelectedSpecialization(specialization)}
                >
                    {specialization.name}
                </Card>
            ))}
        </Row>
    );
});

export default SpecializationBar;
