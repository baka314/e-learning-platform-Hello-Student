import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createDifficultyLevel} from "../../http/courseApi";

const CreateDifficultyLevel = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addDifficultyLevel = () => {
        createDifficultyLevel({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"  style={{ color: 'darkgreen' }}>
                    Додати рівень складності
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть наву рівня"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Зачинити</Button>
                <Button variant="outline-success" onClick={addDifficultyLevel}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDifficultyLevel;
