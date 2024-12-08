//Dependencies
import React from "react";
import { HashRouter, Navigate, useLocation, useRoutes } from "react-router-dom";

// CSS
import './App.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Context
import { AppProvider } from "../../Context";

//Screens
import { UploadScreen } from "../Screens/UploadScreen";

//Components
import { MainContainer } from "../components/MainContainer";
import { AccesibilityCard } from "../components/AccesibilityCard";
import { GovNavbar } from "../components/GovNavbars";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { ToastContainer } from "react-toastify";
import { LoadingCard } from "../components/LoadingCard";

//Utils
import { scrollToValue } from "../../utils/scrollToValue";

const Wrapper = ({children}) => {
    const location = useLocation();
    React.useLayoutEffect(() => {
        scrollToValue();
    }, [location.pathname]);

    return children;
}

const AppRoutes = () => {

    let routes = useRoutes([
        {path: "/home", element: <UploadScreen/>},

        {path: "/*", element: <Navigate replace to={"/home"}/>},
    ]);
    
    return routes;
}

const App = () => {
    return (
        <AppProvider>
            <HashRouter>
                <Wrapper>
                    <GovNavbar/>
                    <AccesibilityCard/>
                    <LoadingCard/>
                    <ConfirmationModal/>

                    <MainContainer>
                        <AppRoutes/>
                    </MainContainer>

                    <ToastContainer/>
                </Wrapper>
            </HashRouter>
        </AppProvider>
    );
}

export default App;

