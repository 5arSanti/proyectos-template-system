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
        region: null,
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
    
            await handlePostFile(event, formData, "/pgr/upload");
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
                    id={"Region"}
                    label={"Region"}
                    onChange={(event) => handleInputChange("region", event, setValues)}
                    array={["R6-L1", "R6-L2", "R9-L1"]}
                    none={true}
                    defaultValue={values?.region}
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