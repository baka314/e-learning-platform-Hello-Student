import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SpecializationBar from '../components/SpecializationBar';
import CourseList from '../components/CourseList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchCourses, fetchDifficultyLevels, fetchSpecializations } from '../http/courseApi';
import Pages from '../components/Pages';
import DifficultyLevelBar from '../components/DifficultyLevelBar';

const CoursesListPage = observer(() => {
    const { course } = useContext(Context);

    useEffect(() => {
        fetchSpecializations().then(data => course.setSpecializations(data));
        fetchDifficultyLevels().then(data => course.setDifficultyLevels(data));
        fetchCourses(null, null, 1, 8).then(data => {
            course.setCourses(data.rows);
            course.setTotalCount(data.count);
        });
    }, [course]);

    useEffect(() => {
        fetchCourses(course.selectedDifficultyLevel?.id, course.selectedSpecialization?.id, course.page, 8).then(data => {
            course.setCourses(data.rows);
            course.setTotalCount(data.count);
        });
    }, [course, course.page, course.selectedDifficultyLevel, course.selectedSpecialization]);

    return (
        <Container className="cosmic-background">
            <Row className="mt-2">
                {/* Специализации теперь в боковой колонке */}
                <Col md={3} className="sidebar">
                  <DifficultyLevelBar />
                </Col>

                <Col md={9} className="content-area">
                    {/* Уровни сложности теперь в основной области */}
                    <SpecializationBar />

                    <Row className="course-grid">
                        <CourseList />
                    </Row>

                    {/* Улучшенная пагинация */}
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Pages />
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default CoursesListPage;
