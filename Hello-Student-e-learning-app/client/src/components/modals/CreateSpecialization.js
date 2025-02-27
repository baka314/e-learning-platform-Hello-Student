import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createSpecialization} from "../../http/courseApi";

const CreateSpecialization = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addSpecialization = () => {
        createSpecialization({name: value}).then(data => {
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
                    Додати направлення курсу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть назву направлення"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Зачинити</Button>
                <Button variant="outline-success" onClick={addSpecialization}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSpecialization;
