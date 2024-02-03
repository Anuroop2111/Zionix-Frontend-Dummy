import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";

import { InboxOutlined, UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
import { useFileContext } from "../FileContext";
const { Dragger } = Upload;

const UploadBOM = () =>{

    const {file,setFileState} = useFileContext();
    const [uploading, setUploading] = useState(false);
    const {setFileDataState} = useFileContext();
    const [enable,setEnable] = useState(false);
    const [pastFiles, setPastFiles] = useState([]);

    const [cookies, setCookie] = useCookies(['exeb2b-ccokie']);

    const navigate = useNavigate();


    const fetchPastBom = async () => {
        const cookieValue = cookies['exeb2b-cookie'];
        console.log("CookieValue = ",cookieValue);

        if (!cookieValue || cookieValue.userId === null) {
            navigate("/login");
        }
        else {
            const userId = cookieValue.userId;
            console.log("userId = ",userId);

            const response = await axios.post("https://dummy-zionix-backend3.onrender.com/files/getPastFiles", {userId}, {withCredentials: true});
            console.log("Response = ", response.data);
            setPastFiles(response.data);

        }
    }

    const handleViewClick = (fileId) => {
        const existingCookieValue = cookies['exeb2b-cookie'];

        // Update the fileId property
        const updatedCookieValue = { ...existingCookieValue, fileId: fileId };
        setCookie('exeb2b-cookie', updatedCookieValue);

        console.log("FileId = ",fileId);
        navigate("/result");
    }
    

    const handleUpload = () => {
        // Manually triggering upload
        console.log("Handle function called successfully");

        if (!file){
            message.error("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        // const url = "http://localhost:3013/files/processFile";  //"https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188";
        const url = "https://dummy-zionix-backend3.onrender.com/files/processFile";
     
        axios.post(url,formData, { withCredentials: true } ) //{ withCredentials: true }
            .then((response) =>{
                // Here, instead of storing in state, store in DB and in the view page, get the data from the DB.
                // const responseData = response.data;
                // setFileDataState(responseData);
                // message.success('Upload Successful');

                const fileId = response.data;
                console.log("Saved file id = ",fileId);
                setEnable(true);
                message.success('Upload Successful');
            })

            .catch((error) =>{
                console.error('Upload failed:', error);
                message.error('Upload failed.');
            })

            .finally(() =>{
                setUploading(false);
            });
    };

    const props = {
        name: 'file',
        accept: ".xls, .xlsx, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: "http://localhost:3013/files/processFile",
        action: () => {
            console.log("Calling action")
            handleUpload();
          },
        fileList: file? [file] : [],
        
        onRemove: () => {
            setFileState(null);
            
          },

        beforeUpload: (uploadedFile) => {
            setFileState(uploadedFile);
            // return false; // Prevent default upload behavior
        },
          
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    useEffect(() => {
        fetchPastBom();
    },[])



    return (
        <>
            <h1 style={{textAlign: 'center'}}>Upload BOM</h1>

        <div style={{paddingLeft: '3vw', paddingRight: '3vw'}}>

            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                {/* <InboxOutlined /> */}
                {/* <UploadOutlined/> */}
                <CloudUploadOutlined/>
                </p>

                <p className="ant-upload-text">Upload BOM file</p>
                {/* <italics>Excel files are supported</italics> */}
                
                <p className="ant-upload-hint">
                Excel files are supported
                </p>

                <span>
                Drag and Drop files
                <br/>
                - or -
                <br/>
                <Button>Browse</Button>
                </span>

            </Dragger>


        </div>

        <div style={{paddingLeft: '90vw',paddingTop:'1vw'}}>
                <Button  loading={uploading}  disabled={!enable}>  
                    <Link to={ {pathname: "/view"} }> {uploading ? 'Uploading' : 'Proceed'} </Link>
                </Button>
        </div>

        <table style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px',  }}>Index</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px',}}>Files</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', }}>Actions</th>
                </tr>
            </thead>

            <tbody>
                {pastFiles.map((item, index) => (
                    <tr key={index+1}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.fileName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <button onClick={() => handleViewClick(item.fileId)}>View</button>
                    </td>
                    </tr>
                ))}
            </tbody>

        </table>
        </> 
    )

};

export default UploadBOM;