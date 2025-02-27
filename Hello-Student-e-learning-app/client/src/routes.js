import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    COURSE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    COURSES_PAGE_ROUTE
} from "./utils/consts";
import Basket from "./pages/BasketPage";
import CoursesListPage from "./pages/CoursesListPage";
import Auth from "./pages/Auth";
import CoursePage from "./pages/CoursePage";
import Main from "./components/Main";
// routes.js


export const routes = [
    {
        path: BASKET_ROUTE,
        component: Basket,
    },
];


export const authRoutes = [
    {
    path: ADMIN_ROUTE,
    Component: Admin
},
{
    path: BASKET_ROUTE,
        Component: Basket
},
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component:Main
    },
    {
        path: COURSES_PAGE_ROUTE,
        Component: CoursesListPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: COURSE_ROUTE + '/:id',
        Component: CoursePage
    },
]
