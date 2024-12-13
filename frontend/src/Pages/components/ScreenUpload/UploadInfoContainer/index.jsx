import { WrapperContainer2 } from "../../WrapperContainers";
import { UploadForm } from "../UploadForm";
import { AllInfoGridContainer } from "../../AllInfoContainer";
import { ButtonCard } from "../../ButtonCard";
import { handleDownloadFile } from "../../../../utils/downloadFile";
import { handlePostData } from "../../../../utils/handleData/handlePostData";
import { jsonToExcel } from "../../../../utils/jsonToExcel";
import { TextAreaCard } from "../../InputsCards";
import React from "react";
import { handleInputChange } from "../../../../utils/handleInputChange";

const UploadInfoContainer = () => {
    const [values, setValues] = React.useState({
        project: null
    });

    const errorLog = localStorage.getItem("errorLog");
    const parsedErrorLog = JSON.parse(errorLog);

    return(
        <AllInfoGridContainer className="grid-1-1">
            <WrapperContainer2 flexDirection="column">
                <UploadForm/>
            </WrapperContainer2>

            <WrapperContainer2 flexDirection="column">
                <ButtonCard onClick={() => {
                    handleDownloadFile("/file/output")
                }}>
                    Descargar Lote
                </ButtonCard>

                <ButtonCard onClick={(event) => {
                    handlePostData(event, {}, "/file/delete-files")
                }}>
                    Vaciar output
                </ButtonCard>

                <ButtonCard onClick={(event) => {
                    handlePostData(event, {}, "/pdf/convert")
                }}>
                    Crear PDFs
                </ButtonCard>

                {parsedErrorLog &&
                    <ButtonCard onClick={() => jsonToExcel(parsedErrorLog)}>
                        Registros: {parsedErrorLog.length} <br />
                        Reporte de archivos no validos
                    </ButtonCard>
                }
            </WrapperContainer2>

            <WrapperContainer2>
                <TextAreaCard
                    id={"Proyecto"}
                    label={"Texto del proyecto"}
                    onChange={(event) => {handleInputChange("project", event, setValues)}}
                />
            </WrapperContainer2>
            <WrapperContainer2 flexDirection="column">
                <ButtonCard onClick={async (event) => {
                    await handlePostData(event, values, "/file/project", null)
                }}>
                    Generar proyecto en excel
                </ButtonCard>
                <ButtonCard onClick={() => {
                    handleDownloadFile("/file/project/excel", "project.xlsx")
                }}>
                    Descargar Lote
                </ButtonCard>
            </WrapperContainer2>
        </AllInfoGridContainer>
    );
}

export { UploadInfoContainer };