import React from "react";
import PropTypes from "prop-types";

import { api } from "../utils/api";
import { fetchAllData } from "../utils/handleData/handleFetchData";
import { handleNotifications } from "../utils/handleNotifications";


export const AppContext = React.createContext();

const AppProvider = ({children}) => {
    AppProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }

	//-------------------------------------
    const [apiUri, setApiUri] = React.useState(api);

    //LOADING, ERROR
    const [loading, setLoading] = React.useState(null);

    //Login Auth
    const [auth, setAuth] = React.useState(false);
    const [name, setName] = React.useState("");

    // RESPONSE:
    const [responseData, setResponseData] = React.useState({});

    const fetchData = async (endpoints, setState=setResponseData) => {
        try {
            setLoading(true);
            const data = await fetchAllData(endpoints);
            setState((prevData) => ({ ...prevData, ...data}));
        } 
        catch (err) {
            handleNotifications("error", err.message)
        } 
        finally {
            setLoading(false);
        }
    }

    // errorLog
    const [errorLog, setErrorLog] = React.useState(null);


    
    // Screen Width
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    // Modal de Confirmacion
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState({
        status: false,
        title: "",
        onConfirm: null,
        onCancel: null,
    });




    return (
        <AppContext.Provider
            value={{
                apiUri,
                loading,
                setLoading,
                
                auth,
                setAuth,
                
                name,
                setName,


                //Tamaño de la pantalla
                windowWidth,
                setWindowWidth,


                //Informacion desde el serveidor
                responseData,
                setResponseData,


                //Modal de confirmación
                openConfirmationModal,
                setOpenConfirmationModal,

                errorLog,
                setErrorLog,

                fetchData
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }