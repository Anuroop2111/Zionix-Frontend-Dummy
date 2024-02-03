import { createContext,useContext, useState } from "react";
import PropTypes from "prop-types";


const FileContext = createContext();

export const FileProvider = ({ children }) =>{
    const [file,setFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [reqData,setReqData] = useState({});
    const [priceData,setPriceData] = useState([]);
    const [indexData, setIndexData] = useState([]);
    
    

    const setReqDataState = (newReqData) => {
        setReqData(newReqData);
    }

    const setPriceDataState = (newPriceData) =>{
        setPriceData(newPriceData);
    }

    const setFileDataState = (newFileData) =>{
        setFileData(newFileData);
    };

    const setFileState = (newFile) =>{
        setFile(newFile);
    };

return (
    <FileContext.Provider value={{file,setFileState,fileData, setFileDataState,priceData,setPriceDataState,reqData,setReqDataState, indexData, setIndexData}}>
        {children}
    </FileContext.Provider>
);

};

FileProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useFileContext = () => {
    const context = useContext(FileContext);

    if (!context){
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};