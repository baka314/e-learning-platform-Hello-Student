import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useHistory } from 'react-router-dom';
import { COURSE_ROUTE } from '../utils/consts';
import './CourseItem.css'; // Подключаем стили

const CourseItem = ({ course }) => {
    const history = useHistory();

    return (
        <Col md={3} className="mt-3" onClick={() => history.push(COURSE_ROUTE + '/' + course.id)}>
            <Card className="course-card" border="light">
                <div className="image-container">
                    <Image className="course-image" src={process.env.REACT_APP_API_URL + course.img} fluid />
                </div>
                <div className="course-info">

                    <div className="course-name">{course.name}</div>
                </div>
            </Card>
        </Col>
    );
};

export default CourseItem;
