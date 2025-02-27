import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, ModalTitle } from "react-bootstrap";
import { Context } from "../../index";
import { createCourse, fetchSpecializations, fetchDifficultyLevels } from "../../http/courseApi";
import { observer } from "mobx-react-lite";

const CreateCourse = observer(({ show, onHide }) => {
    const { course } = useContext(Context);
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [aboutCourse, setAboutCourse] = useState("");
    const [theoryChapters, setTheoryChapters] = useState([]);
    const [knowledgeTest, setKnowledgeTest] = useState([]);

    useEffect(() => {
        fetchDifficultyLevels().then((data) => course.setDifficultyLevels(data));
        fetchSpecializations().then((data) => course.setSpecializations(data));
    }, []);

    const addChapter = () => {
        setTheoryChapters([...theoryChapters, { title: "", theory: "", test: [], id: Date.now() }]);
    };

    const removeChapter = (id) => {
        setTheoryChapters(theoryChapters.filter(chapter => chapter.id !== id));
    };

    const updateChapter = (id, key, value) => {
        setTheoryChapters(theoryChapters.map(chapter => chapter.id === id ? { ...chapter, [key]: value } : chapter));
    };

    const addChapterTestQuestion = (chapterId) => {
        setTheoryChapters(theoryChapters.map(chapter =>
            chapter.id === chapterId
                ? { ...chapter, test: [...chapter.test, { question: "", options: ["", "", ""], correctIndex: 0, id: Date.now() }] }
                : chapter
        ));
    };

    const updateChapterTest = (chapterId, questionId, key, value) => {
        setTheoryChapters(theoryChapters.map(chapter =>
            chapter.id === chapterId
                ? {
                    ...chapter,
                    test: chapter.test.map(q => q.id === questionId ? { ...q, [key]: value } : q)
                }
                : chapter
        ));
    };

    const addCourse = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("img", file);
        formData.append("specializationId", course.selectedSpecialization?.id || "");
        formData.append("difficultyLevelId", course.selectedDifficultyLevel?.id || "");
        formData.append("aboutCourse", aboutCourse);
        formData.append("theoryChapters", JSON.stringify(theoryChapters));
        formData.append("knowledgeTest", JSON.stringify(knowledgeTest));

        createCourse(formData).then(() => onHide());
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title  style={{ color: 'green' }}>Додати курс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {course.selectedDifficultyLevel?.name || "Оберіть рівень складності"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {course.difficultyLevels.map((level) => (
                                <Dropdown.Item onClick={() => course.setSelectedDifficultyLevel(level)} key={level.id}>
                                    {level.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {course.selectedSpecialization?.name || "Оберіть спеціалізацію"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {course.specializations.map((spec) => (
                                <Dropdown.Item onClick={() => course.setSelectedSpecialization(spec)} key={spec.id}>
                                    {spec.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} className="mt-3" placeholder="Назва курсу" />
                    <Form.Control className="mt-3" type="file" onChange={(e) => setFile(e.target.files[0])} />

                    <Form.Control value={aboutCourse} onChange={(e) => setAboutCourse(e.target.value)} className="mt-3" as="textarea" rows={3} placeholder="Коротка інформація про курс" />

                    <Button className="mt-3" onClick={addChapter}>Додати главу</Button>
                    {theoryChapters.map((chapter, index) => (
                        <div key={chapter.id} className="mt-3 p-2 border">
                            <Form.Control value={chapter.title} onChange={(e) => updateChapter(chapter.id, "title", e.target.value)} placeholder={`Назва глави ${index + 1}`} className="mb-2" />
                            <Form.Control value={chapter.theory} onChange={(e) => updateChapter(chapter.id, "theory", e.target.value)} as="textarea" rows={3} placeholder="Теоретичний матеріал" className="mb-2" />
                            <Button onClick={() => addChapterTestQuestion(chapter.id)}>Додати питання до тесту</Button>
                            {chapter.test.map((q, i) => (
                                <Row key={q.id} className="mt-2">
                                    <Col md={12}>
                                        <Form.Control value={q.question} onChange={(e) => updateChapterTest(chapter.id, q.id, "question", e.target.value)} placeholder="Питання" className="mb-2" />
                                        {q.options.map((option, idx) => (
                                            <Row key={idx} className="mb-2">
                                                <Col md={8}>
                                                    <Form.Control value={option} onChange={(e) => updateChapterTest(chapter.id, q.id, "options", q.options.map((o, j) => j === idx ? e.target.value : o))} placeholder={`Варіант ${idx + 1}`} />
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Check type="radio" label="Правильний" checked={q.correctIndex === idx} onChange={() => updateChapterTest(chapter.id, q.id, "correctIndex", idx)} />
                                                </Col>
                                            </Row>
                                        ))}
                                    </Col>
                                </Row>
                            ))}
                            <Button className="mt-2" variant="danger" onClick={() => removeChapter(chapter.id)}>Видалити главу</Button>
                        </div>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>Закрити</Button>
                <Button variant="success" onClick={addCourse}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCourse;
