import React from "react";

import { AppContext } from "../../../../Context";

import { WrapperContainer1 } from "../../WrapperContainers";
import { SubTitle } from "../../SubTitle";
import { OptionInputCard, UploadFileCard } from "../../InputsCards";
import { ButtonCard } from "../../ButtonCard";
import { handleFileChange } from "../../../../utils/handleFileChange";
import { handlePostFile } from "../../../../utils/handleData/handlePostData";
import { handleNotifications } from "../../../../utils/handleNotifications";
import { validateFile } from "../../../../utils/validate/validateFiles";


import "./styles.css";
import { handleInputChange } from "../../../../utils/handleInputChange";
import { reloadLocation } from "../../../../utils/realoadLocation";


const UploadForm = () => {
    const context = React.useContext(AppContext)

    const [values, setValues] = React.useState({
        files: null,
        bootcamp: null,
    });

    const handleFileUpload = async (event) => {
        try {
            context.setLoading(true);
            
            event.preventDefault();

            validateFile(values?.files);
    
            const formData = new FormData();
            formData.append('bootcamp', values.bootcamp);

            for (let i = 0; i < values.files.length; i++) {
                formData.append('file', values.files[i]);
            }
    
            await handlePostFile(event, formData, "/file/upload", (data) => {
                if (data?.errorLog) {
                    console.log(data?.errorLog)
                    localStorage.setItem("errorLog", JSON.stringify(data?.errorLog))
                }
                reloadLocation();
            });
        } 
        catch (err) {
            return handleNotifications("error", err.message);
        } 
        finally {
            context.setLoading(false);
        }
    };

    
    return(
        <WrapperContainer1 padding={30} gap={15}>
            <form encType="multipart/form-data" className="upload-form-container" onSubmit={handleFileUpload}>
                <SubTitle>
                    Por favor seleccione un archivo
                </SubTitle>

                <UploadFileCard
                    id={"file"}
                    onChange={(event) => handleFileChange(event, ['.xlsx'], setValues)}
                    filesArray={values?.files}
                    accept=".xlsx"
                    info="Archivos PDF Excel"
                    multiple={true}
                />
                <OptionInputCard
                    id={"bootcamp"}
                    label={"Bootcamp"}
                    onChange={(event) => handleInputChange("bootcamp", event, setValues)}
                    array={["Programacion", "Analisis de datos", "Inteligencia artificial"]}
                    none={true}
                    defaultValue={values?.bootcamp}
                />

                <ButtonCard 
                    title="Enviar Archivo"
                    type="submit"
                >
                    Enviar Archivo
                </ButtonCard>
            </form>
        </WrapperContainer1>
    )
}

export { UploadForm };