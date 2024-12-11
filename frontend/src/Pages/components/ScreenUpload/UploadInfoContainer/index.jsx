import { WrapperContainer2 } from "../../WrapperContainers";
import { UploadForm } from "../UploadForm";
import { AllInfoGridContainer } from "../../AllInfoContainer";
import { handlePostData } from "../../../../utils/handleData/handlePostData";
import { ButtonCard } from "../../ButtonCard";

const UploadInfoContainer = () => {

    return(
        <AllInfoGridContainer className="grid-1-1">
            <WrapperContainer2 flexDirection="column">
                <UploadForm/>
            </WrapperContainer2>

            <WrapperContainer2 flexDirection="column">
                <ButtonCard onClick={(event) => {
                    handlePostData(event, {}, "/pgr/delete-files")
                }}>
                    Vaciar entregables
                </ButtonCard>
            </WrapperContainer2>
        </AllInfoGridContainer>
    );
}

export { UploadInfoContainer };