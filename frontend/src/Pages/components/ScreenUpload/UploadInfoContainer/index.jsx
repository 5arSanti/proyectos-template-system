import React from "react";

import { WrapperContainer2 } from "../../WrapperContainers";
import { UploadForm } from "../UploadForm";
import { AllInfoGridContainer } from "../../AllInfoContainer";
import { ButtonCard } from "../../ButtonCard";
import { handleDownloadFile } from "../../../../utils/downloadFile";
import { handlePostData } from "../../../../utils/handleData/handlePostData";

const UploadInfoContainer = () => {
    const [values, setValues] = React.useState({
        jsonValue: null,
    });

    return(
        <WrapperContainer2 padding={0} flexDirection={"column"}>
            <AllInfoGridContainer className="grid-1-1">
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
            </AllInfoGridContainer>

            <WrapperContainer2 flexDirection="column">
                <UploadForm/>
            </WrapperContainer2>
        </WrapperContainer2>
    );
}

export { UploadInfoContainer };