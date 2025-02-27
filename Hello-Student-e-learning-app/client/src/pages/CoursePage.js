import React, { useEffect, useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { fetchOneCourse } from '../http/courseApi';
import BasketStore from '../store/BasketStore';
import { BASKET_ROUTE } from '../utils/consts';
import './CoursePage.css';

const CoursePage = () => {
    const [course, setCourse] = useState({ info: [], knowledgeTest: [], theoryChapters: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [chapterResults, setChapterResults] = useState({});
    const [completedChapters, setCompletedChapters] = useState([0]); // Початково перша глава відкрита
    const [showModal, setShowModal] = useState(false); // Стан для модального вікна
    const [currentChapter, setCurrentChapter] = useState(0); // Для зберігання поточної глави
    const [expandedChapters, setExpandedChapters] = useState([]); // Для збереження розгорнутих глав
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        setError(null);
        setLoading(true);

        fetchOneCourse(id)
            .then(data => {
                if (data) {
                    setCourse(data);
                } else {
                    setError('Дані про курс не знайдені');
                }
            })
            .catch(err => {
                console.error('Помилка при завантаженні курсу:', err);
                setError('Не вдалося завантажити дані про курс');
            })
            .finally(() => setLoading(false));
    }, [id]);

    const addToBasket = () => {
        BasketStore.addToBasket(course);
        history.push(BASKET_ROUTE);
    };

    const handleAnswer = (chapterIndex, questionIndex, optionIndex) => {
        setUserAnswers(prev => {
            const newAnswers = { ...prev };
            if (!newAnswers[chapterIndex]) {
                newAnswers[chapterIndex] = {};
            }
            newAnswers[chapterIndex][questionIndex] = optionIndex;
            return newAnswers;
        });
    };

    const checkChapterCompletion = (chapterIndex) => {
        const answers = userAnswers[chapterIndex] || {};
        const chapter = course.theoryChapters[chapterIndex];
        const allCorrect = chapter.test.every((q, index) => answers[index] === q.correctIndex);
        setChapterResults(prev => {
            const newResults = { ...prev, [chapterIndex]: allCorrect };
            // Якщо всі відповіді правильні, додаємо наступну главу
            if (allCorrect && chapterIndex < course.theoryChapters.length - 1) {
                setCompletedChapters(prevCompleted => [...prevCompleted, chapterIndex + 1]);
                setCurrentChapter(chapterIndex + 1); // Переходимо до наступної глави
                setShowModal(true); // Відображаємо модальне вікно
            }
            return newResults;
        });
    };

    const handleCloseModal = () => setShowModal(false);

    const handleNextChapter = () => {
        setShowModal(false);
        window.scrollTo(0, 0); // Прокрутка на початок
    };

    const handlePreviousChapter = () => {
        setCurrentChapter(currentChapter - 1); // Повертаємось до попередньої глави
    };

    const toggleChapterExpansion = (chapterIndex) => {
        setExpandedChapters(prev => {
            if (prev.includes(chapterIndex)) {
                return prev.filter(index => index !== chapterIndex); // Якщо вже розгорнута - згортати
            } else {
                return [...prev, chapterIndex]; // Якщо не розгорнута - розгортаємо
            }
        });
    };

    const splitTextIntoParagraphs = (text) => {
        const paragraphs = text.split('\n'); // Разделяем текст на части по новой строке
        const chunkSize = Math.ceil(paragraphs.length / 4);
        let splitText = [];

        for (let i = 0; i < 4; i++) {
            splitText.push(paragraphs.slice(i * chunkSize, (i + 1) * chunkSize).join(' '));
        }

        return splitText;
    };

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div style={{ color: 'red' }}>Помилка: {error}</div>;

    return (
        <div className="course-page">
            <div className="course-header">
                <Image className="course-image" src={process.env.REACT_APP_API_URL + course.img} alt={course.name} />
                <h2 className="course-title">{course.name}</h2>
                <Button onClick={addToBasket} className="add-to-basket-btn">Додати в обране</Button>
            </div>

            {course.aboutCourse && (
                <div className="info-container">
                    <h1>Коротко про курс</h1>
                    <p>{course.aboutCourse}</p>
                </div>
            )}

            {Array.isArray(course.theoryChapters) && course.theoryChapters.length > 0 && (
                <div className="info-container">
                    <h1>Зміст курсу</h1>

                    {/* Кнопка для повернення до попередньої глави */}
                    {currentChapter > 0 && (
                        <Button onClick={handlePreviousChapter} style={{ marginBottom: '3%' }}>Повернутись до попередньої глави</Button>
                    )}

                    {course.theoryChapters.map((chapter, chapterIndex) => (
                        <div key={chapterIndex} className="chapter-item">
                            {/* Якщо це поточна глава, показуємо її, інакше приховуємо */}
                            {completedChapters.includes(chapterIndex) && currentChapter === chapterIndex && (
                                <>
                                    <h5>{`Глава ${chapterIndex + 1}: ${chapter.title}`}</h5>

                                    {/* Разделение теории на 3 абзаца */}
                                    {chapter.theory && (
                                        <>
                                            {splitTextIntoParagraphs(chapter.theory).map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </>
                                    )}

                                    {expandedChapters.includes(chapterIndex) && (
                                        <div>
                                            {Array.isArray(chapter.test) && chapter.test.length > 0 && (
                                                <div className="test-container">
                                                    <h6>Тест до глави:</h6>
                                                    {chapter.test.map((q, questionIndex) => (
                                                        <div key={questionIndex} className="question-item">
                                                            <h6>{`${questionIndex + 1}. ${q.question}`}</h6>
                                                            <ul>
                                                                {q.options.map((option, optionIndex) => (
                                                                    <li
                                                                        key={optionIndex}
                                                                        onClick={() => handleAnswer(chapterIndex, questionIndex, optionIndex)}
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            backgroundColor: userAnswers[chapterIndex]?.[questionIndex] === optionIndex ? 'lightblue' : '',
                                                                            color: userAnswers[chapterIndex]?.[questionIndex] === optionIndex ? 'blue' : ''
                                                                        }}
                                                                    >
                                                                        {option}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                    <Button onClick={() => checkChapterCompletion(chapterIndex)}>Перевірити главу</Button>
                                                    {chapterResults[chapterIndex] !== undefined && (
                                                        <div className="chapter-feedback">
                                                            {chapterResults[chapterIndex]
                                                                ? 'Молодець! Переходьте до наступної глави.'
                                                                : 'Перечитайте главу ще раз.'}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Кнопка для розгортання або згортання глави */}
                                    {completedChapters.includes(chapterIndex) && !expandedChapters.includes(chapterIndex) && (
                                        <Button onClick={() => toggleChapterExpansion(chapterIndex)}>Пройти тестування</Button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Модальне вікно для переходу до наступної глави */}
            <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Молодець!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ти успішно вивчив главу. Переходь до наступної глави.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Закрити
                    </Button>
                    <Button variant="primary" onClick={handleNextChapter}>
                        Перейти до наступної глави
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CoursePage;
