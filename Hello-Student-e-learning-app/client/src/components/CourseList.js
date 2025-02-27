import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CourseItem from "./CourseItem";

const CourseList = observer(() => {
    const {course} = useContext(Context)

    return (
        <Row className="d-flex">
            {course.courses.map(course =>
                <CourseItem key={course.id} course={course}/>
            )}
        </Row>
    );
});

export default CourseList;
