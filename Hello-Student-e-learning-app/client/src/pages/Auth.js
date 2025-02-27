import React, { useContext, useState, useCallback } from 'react';
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, COURSES_PAGE_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import './Auth.css';
import alienHello from "./alien-hello.jpg";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAuth = useCallback(async () => {
        if (!email.trim() || !password.trim()) {
            setErrorMessage("Будь ласка, заповніть всі поля.");
            return;
        }

        try {
            const data = isLogin ? await login(email, password) : await registration(email, password);
            user.setUser(data);
            user.setIsAuth(true);
            history.push(COURSES_PAGE_ROUTE);
        } catch (e) {
            console.error("Помилка авторизації:", e);

            if (e.response) {
                const status = e.response.status;
                const message = e.response.data.message || "Сталася помилка. Спробуйте ще раз.";

                if (isLogin) {
                    if (status === 404) {
                        setErrorMessage("Користувача не знайдено. Перевірте email.");
                    } else if (status === 401) {
                        setErrorMessage("Неправильний email або пароль.");
                    } else {
                        setErrorMessage(message);
                    }
                } else {
                    if (status === 409) {
                        setErrorMessage("Користувач з таким email вже зареєстрований.");
                    } else {
                        setErrorMessage(message);
                    }
                }
            } else {
                setErrorMessage("Помилка з'єднання з сервером. Перевірте мережу.");
            }
        }
    }, [email, password, isLogin, user, history]);

    return (
        <Container className="auth-container">
            <Card className="auth-card">
                <h2>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <Form className="auth-form">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div className="auth-link">
                            {isLogin ? (
                                <div>
                                    Немає акаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструватися</NavLink>
                                </div>
                            ) : (
                                <div>
                                    Є акаунт? <NavLink to={LOGIN_ROUTE}>Увійти</NavLink>
                                </div>
                            )}
                        </div>
                        <Button className="auth-button" onClick={handleAuth}>
                            {isLogin ? 'Увійти' : 'Зареєструватися'}
                        </Button>
                    </Row>
                </Form>
            </Card>
            <img src={alienHello} className="alien-hello" alt="alien-hello"/>
        </Container>
    );
});

export default Auth;
