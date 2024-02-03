import React, { useEffect } from "react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFileContext } from "../FileContext";
import axios from "axios";

import {Table, Select, Button, Radio, Card, Space, message} from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const ViewBOM = () => {
    const navigate = useNavigate();

    const [fileData, setFileData] = useState([]);
    // const {fileData} = useFileContext();
    // const n = fileData.rowLen+1;
    // let n = 0;

    // if (fileData && fileData.rowLen) {
    //     n = fileData.rowLen + 1;
    // }

    const [n,setN] = useState(0);
    const [selectedColumns, setSelectedColumns] = useState(Array(0).fill(null));
    const [header,setHeader] = useState('');
    // const {priceData,setPriceDataState} = useFileContext();
    // const {reqData,setReqDataState} = useFileContext();
    const [fileName, setFileName] = useState("");
    const {indexData,setIndexData} = useFileContext();
    const [uploading, setUploading] = useState(false);
    const [enabledQ,setEnabledQ] = useState(false);
    const [enabledP, setEnabledP] = useState(false);
    const [enabledM, setEnabledM] = useState(false);
    const [enabledD, setEnabledD] = useState(false);
    const [tableData, setTableData] = useState([]);


    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [shouldRenderLink, setShouldRenderLink] = useState(false);

    const [quantityIndex,setQuantityIndex] = useState();
    const [partNumberIndex,setPartNumberIndex] = useState();
    const [manufacturerIndex, setManufacturerIndex] = useState();
    const [descriptionIndex, setDescriptionIndex] = useState();

    const columnNames = ["Quantity","Part Number", "Manufacturer", "Description"];

    let columnOptions = columnNames.map((column) =>(
        <Select.Option key={column} value={column} disabled={selectedColumns.includes(column)}>
            {column}
        </Select.Option>
    ));

    const columns = selectedColumns.map((colName,index) => ({
        title: index===0? "Sl No." : (
            <Select 
                value={colName || "Select"}
                onChange={(value) => handleColumnSelect(value,index)}
                style = {{width: 150}}
            >
                {columnOptions}

                <Select.Option key={`clear-${index}`} value={null}
                    onClick={() => {
                        console.log("columnOptions = ", columnOptions);
                        console.log("colName = ", colName);
                        console.log(`Clear button clicked for index ${index}`);
                        clearSelection(index);
                    }
                }>

                    <span 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            backgroundColor: '#f0f0f0',
                            color: '#333',
                            fontWeight: 'bold',
                        }}
                    >
                        Clear
                    </span>

                </Select.Option>
                
            </Select>
        ),
        dataIndex: `col${index}`, // Unique dataIndex for each column
        key: `col${index}`
    }));

    const fetchFile = async () =>{
        try {
            const fileDatabaseData = await axios.post("/api/files/getFile",{ withCredentials: true },); // 
            console.log("Received File data : ",fileDatabaseData.data);
            const fileName = fileDatabaseData.data.file_name;
            const file_data = fileDatabaseData.data.file_data;
            const rowData = fileDatabaseData.data.file_data.rowData;
            setN(file_data.rowLen +1);
            setFileName(fileName);
            setFileData(file_data);

            const data = rowData.map((row) => {
                const data_row = {};

                data_row[`col${0}`] = row.index;
                row.data.forEach((cell,columnIndex) =>{
                    data_row[`col${columnIndex+1}`] = cell;
                });

                return data_row;
            });

            console.log("table data : ",data);

            setTableData(data);

        } catch(e){
            console.log("Error getting file data in View : ",e);
        }
    }

    useEffect(() => {
        console.log("UseEffect 1");
        fetchFile();
    },[]);

    useEffect(() => {
        console.log("UseEffect 2");
        setSelectedColumns(Array(n).fill(null));
    },[n])

    // const data = (fileData && fileData.rowData) ? fileData.rowData.map((row) =>{
    //     const rowData = {};
    //     console.log("File Data = ", fileData);

    //     rowData[`col${0}`] = row.index;
    //     row.data.forEach((cell,columnIndex) =>{
    //         rowData[`col${columnIndex+1}`] = cell;
    //     });

    //     console.log("Table row Data: ",rowData)
    //     return rowData;
    // }) : [];

    const clearSelection = (index) =>{
        console.log("Clear Select called");
        const updatedColumns = [...selectedColumns];
        console.log("updatedColumns[index] = ",updatedColumns[index]);
        if (updatedColumns[index] === "Quantity"){
            setQuantityIndex(null);
            setEnabledQ(false);
            setButtonDisabled(false);

        } else if (updatedColumns[index] === "Part Number"){
            setPartNumberIndex(null);
            setEnabledP(false);
            setButtonDisabled(false);


        } else if (updatedColumns[index] === "Manufacturer"){
            setManufacturerIndex(null);
            setEnabledM(false);

        } else if (updatedColumns[index] === "Description"){
            setDescriptionIndex(null);
            setEnabledD(false);
        } 

        console.log("QuantityIndex = ",quantityIndex);
        console.log("Part Number Index = ",partNumberIndex);
        console.log("Manufacturer Index = ",manufacturerIndex);
        console.log("Description Index = ",descriptionIndex);

        updatedColumns[index] = null;
        setSelectedColumns(updatedColumns);
    };

    const handleColumnSelect = (value,index) =>{
        console.log("Value = ",value);
        console.log("index = ",index);
        const prevValue = selectedColumns[index];
        const updatedColumns = [...selectedColumns];
        const isDeselection = value === null;
        console.log("isDeselection = ",isDeselection);

        // If a value is selected, disable it in other Select menus
        if (!isDeselection) {
            columnOptions = columnOptions.map((option) => {
                const column = option.props.value;
                console.log("column = ",column);
                return React.cloneElement(option, {
                    disabled: column === value || selectedColumns.includes(column),
                });
            });
        }

        // Update selected columns
        updatedColumns[index] = value;
        console.log("updatedColumns = ",updatedColumns);
        setSelectedColumns(updatedColumns);

        console.log("Columns selected for : ",value, "For Index = ",index);

        // Use states to store the finally selected Qunatity Index and Part Number Index
        if (value==="Quantity"){
            setQuantityIndex(index);
            setEnabledQ(true);
        }

        else if (value==="Part Number"){
            setPartNumberIndex(index);
            setEnabledP(true);
        }

        else if (value==="Manufacturer"){
            setManufacturerIndex(index);
            setEnabledM(true);
        }

        else if (value==="Description"){
            setDescriptionIndex(index);
            setEnabledD(true);
        }


        if (prevValue==="Quantity"){
            setQuantityIndex(null);
            setEnabledQ(false);
        }

        else if (prevValue==="Part Number"){
            setPartNumberIndex(null);
            setEnabledP(false);
        }

        else if (prevValue==="Manufacturer"){
            setManufacturerIndex(null);
            setEnabledM(false);
        }

        else if (prevValue==="Description"){
            setDescriptionIndex(null);
            setEnabledD(false);
        }


        console.log("QuantityIndex = ",quantityIndex);
        console.log("Part Number Index = ",partNumberIndex);
        console.log("Manufacturer Index = ",manufacturerIndex);
        console.log("Description Index = ",descriptionIndex);
    };

    const handleData = async () => {

        // Instead of using State for rowData, just directly get the data from database in the backend.

        // Here, instead of sending the fileData, may be just send the fileId and the data be fetched in the backend from the DB??
        const requestObj = {
            rowData: fileData.rowData,// an array of objects -> .index, 
            header: header,
            QuantityIndex: quantityIndex,
            PartNumIndex: partNumberIndex,
            ManufacturerIndex: manufacturerIndex,
            DescriptionIndex: descriptionIndex
        };

        setUploading(true);
        console.log("Request Obj = ",requestObj);

        // Returns the data of the index that are have invalid/0 qauntity
        const responseFlag = await axios.post('/api/files/checkQuantity',requestObj, {withCredentials: true});
        // If any quantity is invalid, provide option to edit the file on the page and also provide a save File button to save it / Automatically save it / Or when the user edits it, update it in the DB
         
        console.log("responseFlag = ",responseFlag.data.flag);

        if (responseFlag.data.flag === true){
            // setReqDataState(requestObj);
            // console.log("ReqData = ",reqData);

            // Set the requestObj to a database
            const saveResponse = await axios.post("/api/save/store", requestObj, {withCredentials : true});
            console.log("Save Response = ",saveResponse.data); // indexArr
            // setIndexData(saveResponse.data);

            setShouldRenderLink(true); // Set to true to enable delayed rendering
            console.log("should render = ",shouldRenderLink);

        } else {
            console.log("Quantity is 0 in index = ", responseFlag.data.indexIssue); 
            showErrorIndex(responseFlag.data.indexIssue);
        }
        setUploading(false);
        // const response = await axios.post('http://localhost:/api/test',requestObj);
        // setPriceDataState(response.data);
    };

    const showErrorIndex = (index)=>{
        message.warning(`Quantity is 0 / invalid for Index - ${index}`);
    }

    const handleRadio = (e) =>{
        setHeader(e.target.value); // Yes or No;
    }

    useEffect(() =>{
        console.log("UseEffect 3");
        setButtonDisabled(!header || !enabledQ || !enabledP); 
    },[header, enabledP, enabledQ, isButtonDisabled, enabledM, enabledD])

    useEffect(() =>{
        console.log("UseEffect 4");

        if (shouldRenderLink){
            navigate('/result');
        }

    },[shouldRenderLink, navigate])

    return (

        <>
        <h2 style={{textAlign: 'center'}}>View BOM {fileName ? `- ${fileName}` : ""}</h2>

        {tableData.length > 0 ? (
        <>

        <Space direction="vertical" size={16}>
            <Card title="Header present? *" style={{width: 200, height: 120}}>
                <Radio.Group onChange={handleRadio}>
                    <Radio value={"Yes"}>Yes</Radio>
                    <Radio value={"No"}>No</Radio>
                </Radio.Group>
            </Card>
        </Space>
        
        <br/> <br/>

        <Button onClick={handleData} disabled={isButtonDisabled}>
            {shouldRenderLink ? (
            <Link to={ {pathname: "/result"} }> {uploading ? 'Uploading' : 'Proceed'} </Link>
            ) : (uploading ? 'Uploading' : 'Proceed')
            }
        </Button>

        <br/><br/>
            

        <Table
            columns={columns}
            dataSource={tableData}
            bordered
            pagination={false}
        />

        </>
        ) : (
            <p>No data available</p>
            )
        }
        </>

    )

};

export default ViewBOM;