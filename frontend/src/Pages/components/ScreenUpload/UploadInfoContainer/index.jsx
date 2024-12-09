import { WrapperContainer2 } from "../../WrapperContainers";
import { UploadForm } from "../UploadForm";
import { AllInfoGridContainer } from "../../AllInfoContainer";
import { ButtonCard } from "../../ButtonCard";
import { handleDownloadFile } from "../../../../utils/downloadFile";
import { handlePostData } from "../../../../utils/handleData/handlePostData";
import { jsonToExcel } from "../../../../utils/jsonToExcel";

const UploadInfoContainer = () => {
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
                {parsedErrorLog &&
                    <ButtonCard onClick={() => jsonToExcel(parsedErrorLog)}>
                        Registros: {parsedErrorLog.length} <br />
                        Reporte de archivos no validos
                    </ButtonCard>
                }
            </WrapperContainer2>
        </AllInfoGridContainer>
    );
}

export { UploadInfoContainer };