import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import "./admin.css";
import alienIMG from './alien.png';
import CreateSpecialization from "../components/modals/CreateSpecialization";
import CreateCourse from "../components/modals/CreateCourse";
import CreateDifficultyLevel from "../components/modals/CreateDifficultyLevel";
const Admin = () => {
    const [specializationVisible, setSpecializationVisible] = useState(false);
    const [difficultLevelVisible, setDifficultyLevelVisible] = useState(false);
    const [courseVisible, setCourseVisible] = useState(false);


    return (

        <Container className="admin-container d-flex flex-column align-items-center">
            <div className="page-box">
                <div className="admin-box"><h1 className="admin-title"> Панель для вчителя🚀</h1>

                    <p className="admin-subtitle">Створюй курси, навчай - покращуй світ</p>

                    <Button
                        variant="outline-light"
                        className="admin-button mt-3"
                        onClick={() => setDifficultyLevelVisible(true)}
                    >
                        Додати рівень складності
                    </Button>

                    <Button
                        variant="outline-light"
                        className="admin-button mt-3"
                        onClick={() => setSpecializationVisible(true)}
                    >
                        Додати направлення курсу
                    </Button>

                    <Button
                        variant="outline-light"
                        className="admin-button mt-3"
                        onClick={() => setCourseVisible(true)}
                    >
                        Додати курс
                    </Button>

                    <CreateSpecialization show={specializationVisible} onHide={() => setSpecializationVisible(false)}/>
                    <CreateCourse show={courseVisible} onHide={() => setCourseVisible(false)}/>
                    <CreateDifficultyLevel show={difficultLevelVisible} onHide={() => setDifficultyLevelVisible(false)}/>
                    </div> <img src={alienIMG} className="alien" alt="alien"/>
            </div>

        </Container>

    );
};

export default Admin;
