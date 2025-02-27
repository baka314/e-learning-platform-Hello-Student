import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import './DifficultyLevelBar.css';
const DifficultyLevelBar = observer(() => {
    const { course } = useContext(Context);

    return (
        <ListGroup className="difficulty-bar">
            {course.difficultyLevels.map(difficultyLevel => (
                <ListGroup.Item
                    className={`difficulty-item ${difficultyLevel.id === course.selectedDifficultyLevel.id ? 'active' : ''}`}
                    onClick={() => course.setSelectedDifficultyLevel(difficultyLevel)}
                    key={difficultyLevel.id}
                >
                    {difficultyLevel.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default DifficultyLevelBar;
