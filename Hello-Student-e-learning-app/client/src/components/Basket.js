
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Image, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Заменяем useNavigate на useHistory
import BasketStore from '../store/BasketStore';
import './BasketStyles.css';
import { COURSES_PAGE_ROUTE } from '../utils/consts';
import PayPalButton from './PayPalButton'; // Подключаем кнопку PayPal

const Basket = observer(() => {
    const basket = BasketStore;
    const history = useHistory(); // Используем useHistory вместо useNavigate

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [savedComment, setSavedComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleRemoveFromBasket = (courseId) => {
        basket.removeFromBasket(courseId);
    };

    const handleGoToCourses = () => {
        history.push(COURSES_PAGE_ROUTE);
    };

    const handleSaveComment = () => {
        const fullComment = `Ім'я: ${firstName}, Прізвище: ${lastName}, Телефон: ${phone}, Коментар: ${comment}`;
        setSavedComment(fullComment);
        setFirstName('');
        setLastName('');
        setPhone('');
        setComment('');
        setIsEditing(false);
    };

    return (
        <div className="body">
            <h1 className="basketTitle">Обрані курси</h1>

            {basket.totalItems === 0 ? (
                <div className="emptyBasketContainer">
                    <p className="messageAboutEmptyBasket">Список обраних курсів порожній</p>
                    <Button className="btnToTheStore" onClick={handleGoToCourses}>
                        Перейти до вибору курсів
                    </Button>
                </div>
            ) : (
                <>
                    <Button style={{ cursor: 'pointer', margin: '1%' }} onClick={handleGoToCourses}>
                        Перейти до вибору курсів
                    </Button>
                    <ListGroup>
                        {basket.basket.map((course) => (
                            <ListGroup.Item
                                key={course.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div style={{ width: '15vw' }}>
                                    <Image
                                        width={120}
                                        height={120}
                                        src={process.env.REACT_APP_API_URL + course.img}

                                    />
                                </div>
                                <div style={{ flex: '1' }}>
                                    <div className="courseName">{course.name}</div>
                                </div>
                                <div style={{ width: '80px' }}>
                                    <div className="coursePrice">{course.specializationId.name} </div>
                                </div>
                                <Button
                                    style={{ marginLeft: '10%' }}
                                    variant="danger"
                                    onClick={() => handleRemoveFromBasket(course.id)}
                                >
                                    Видалити з обраного
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>







                </>
            )}
        </div>
    );
});

export default Basket;
