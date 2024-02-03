// Search by Part Number and Quantity
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { useCookies } from 'react-cookie';

import {Table} from 'antd';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:3013');

import { useFileContext } from "../FileContext";

const PartNumber = () =>{
    const didMountRef = useRef(false);

    const [cookies] = useCookies(['exeb2b-cookie']);
    const {priceData,setPriceDataState} = useFileContext();
    const {indexData,setIndexData} = useFileContext();
    // const {reqData} = useFileContext();

    const [combinedData, setCombinedData] = useState(new Map());

    const sendData = () =>{
        console.log("Called send data");
        const exeb2bCookie = cookies['exeb2b-cookie'];
        console.log("cookie  = ",exeb2bCookie);

        const fileId = exeb2bCookie.fileId;
        const userId = exeb2bCookie.userId;


        // if (exeb2bCookie) {
        //     const parsedCookie = JSON.parse(exeb2bCookie);
        //     fileId = parsedCookie.fileId;
        // }

        console.log("File id = ",fileId);


        // console.log("Data being Send ", reqData);
        // Here, use the fileId to get the Demanded database Data, and then send that data to the backend
        // socket.emit("send_data",reqData);

        // Send the fileId to the backend, from where the demanded data is fetched and then used for getting the value.
        socket.emit("send_data",{fileId: fileId, userId: userId});

    };

    const receiveDataHandler = async (data) => {
        console.log("Received Data inside useEffect = ", data);
        // const index = data[0].index;
        // const data_id = data[0].data_id;
        // const file_id = data[0].file_id;

        const dataValue = await axios.post('/api/result/getData', data, {withCredentials: true});
        console.log("Datavalue of result = ",dataValue.data);

        const index = dataValue.data.index;
        const icon = dataValue.data.icon;
        const recommended_MPN = dataValue.data.recommended_MPN;
        const distributer = dataValue.data.distributer;
        const brand = dataValue.data.brand;
        const quantity = dataValue.data.quantity;
        const unit_price = dataValue.data.unit_price;
        const total_price = dataValue.data.total_price;
        const availability = dataValue.data.availability;
        const specs = dataValue.data.description;

        console.log("index = ",index);
        console.log("recommended_MPN = ",recommended_MPN);
        console.log("icon = ",icon);
        console.log("quantity = ",quantity);
        console.log("distributer = ",distributer);
        console.log("availability = ",availability);
        console.log("specs = ",specs);
        console.log("brand = ",brand);
        console.log("unitPrice = ",unit_price);
        console.log("total_price = ",total_price);

        setCombinedData((prevCombinedData) => {
            const updatedData = new Map(prevCombinedData);

            const existingRowData = updatedData.get(index);

            if (existingRowData){
                updatedData.set(index,{
                    ...existingRowData,
                    "ManuPNo": recommended_MPN,
                    "distributer": distributer, 
                    "manufacturer": brand, 
                    "quantity": quantity, 
                    "unit_price": unit_price, 
                    "price": total_price,
                    "icon" : (icon === true) ? "tick" : "?",
                    "availability": availability,
                })
            }

            return updatedData;
        });
    };

    const fetchData = async () => {
        try{
            console.log("index data = ",indexData);
            const databaseData = await axios.post("/api/save/getData",{withCredentials: true});
            console.log("Data from backend = ",databaseData.data);
            // console.log("Combined data before = ",combinedData);

            const initialData = new Map();

            for (const item of databaseData.data){
                const index = item.index;
                const demanded_mpn = item.demanded_mpn;
                const demanded_quantity = item.demanded_quantity;
                const demanded_specs = item.demanded_specs;
                const demanded_brand = item.demanded_brand;
                // console.log("Index = ",index);
                // console.log("demanded_mpn = ",demanded_mpn);
                // console.log("demanded_quantity = ",demanded_quantity);
                // console.log("demanded_specs = ",demanded_specs);
                // console.log("demanded_brand = ",demanded_brand);


                initialData.set(index, 
                    { "slno": index,
                    "demanded_mpn": demanded_mpn, 
                    "demanded_brand": demanded_brand, 
                    "demanded_specs": demanded_specs, 
                    "demanded_quantity": demanded_quantity, 
                    "icon": null, 
                    "ManuPNo": null, 
                    "distributer": null, 
                    "manufacturer": null, 
                    "quantity": null, 
                    "unit_price": null, 
                    "price": null,
                    'currency': null, 
                    "availability": null,
                    }
                );

            }
            setCombinedData(initialData);
            // newData = Array.from(combinedData.values());



            // console.log("Combined data after = ",combinedData);
            

        } catch (error){
            console.log("Error in getting the data from backend : ",error);
        }
    }

    const columns = [

        {
            title: "Sl No.",
            dataIndex: 'slno',
            key: 'slno'
        },
        {
            title: 'Demanded MPN',
            dataIndex: 'demanded_mpn',
            key: 'demanded_mpn',
        },

        {
            title: 'Demanded Brand',
            dataIndex: 'demanded_brand',
            key: 'demanded_brand',
        },

        {
            title: 'Demanded Specs',
            dataIndex: 'demanded_specs',
            key: 'demanded_specs',
        },

        {
            title: 'Demanded Quantity',
            dataIndex: 'demanded_quantity',
            key: 'demanded_quantity',
        },

        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
        },

        {
            title: 'Manufacturer Part No.',
            dataIndex: 'ManuPNo',
            key: 'ManuPNo',
            // render: (text) => (
            //     <div>
            //       <div style={{ fontWeight: 'bold' }}>{text.partNum} - {text.data.MPN}</div>
            //       <div>{text.data.Description}</div>
            //     </div>
            //   ),
        },

        {
            title: 'Distributer',
            dataIndex: 'distributer',
            key: 'distributer'
        },

        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer'
        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },

        {
            title: 'Unit Price (INR)',
            dataIndex: 'unit_price',
            key: 'unit_price'
        },

        {
            title: 'Total Price (INR)',
            dataIndex: 'price',
            key: 'price',
            // render: (price) =>(
            //     <div>{price.Price === "NaN" ? price.Quantity : price.Price}</div>
            // )
        },

        // {
        //     title: 'Currency',
        //     dataIndex: 'currency',
        //     key: 'currency'
        // },

        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability'
        },
    ]

    useEffect(() =>{
        console.log("UseEffect starting...");
        fetchData();

        if (!didMountRef.current) {
            sendData();
            console.log("Data sent to websocket");
            didMountRef.current = true;
        }
     
        console.log("UseEffect called")

        socket.on("receive_data", receiveDataHandler);

        return () => {
            // Cleanup: remove the event listener when the component unmounts
            socket.off("receive_data", receiveDataHandler);
        };

    },[]);


    // const data = priceData.map((dataItem) =>{
    //     const rowData = {}

    //     rowData['slno'] = dataItem[0].index
    //     rowData['ManuPNo'] = dataItem[0]
    //     rowData['distributer'] = dataItem[0].data.Distributer
    //     rowData['manufacturer'] = dataItem[0].data.Manufacturer
    //     rowData['quantity'] = dataItem[0].quantity

    //     console.log("DataItem[0] = ",dataItem[0]);

    //     dataItem[0].data.Price.map((price) =>{
    //         console.log("Price sent for render : ",price);
    //         rowData['price'] = price
    //     })

    //     rowData['currency'] = dataItem[0].currency
    //     rowData['availability'] = dataItem[0].data.Availability

    //     return rowData;

    // });

    // let newData = Array.from(combinedData.values());

    return (
        <div>
            <h2 style={{textAlign:"center"}}>Price Result</h2>

            <hr />
            <hr />

            <div>
                {priceData && (
                    <Table
                        columns={columns}
                        dataSource={Array.from(combinedData.values())}
                        bordered
                        pagination={false}
                    />


                // <div>
                //     {priceData.map((dataItem,Indx) =>(
                //         dataItem[0] && (
                //             <div key={Indx}>
                //                 <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                //                     <div style={{ flex: 1 }}>
                //                         <strong>{dataItem[0].index}</strong> 
                //                     </div>
                //                     <div style={{flex:25}}>
                //                         <strong>Part Number:</strong> {dataItem[0].partNum}
                //                         <br/>
                //                         {dataItem[0].data ? (
                //                             <>
                //                             <strong>Distributer:</strong> {dataItem[0].data.Distributer}
                //                             <br/>
                //                             <strong>Availability:</strong> {dataItem[0].data.Availability}
                //                             <br/>
                //                             <strong>Description:</strong> {dataItem[0].data.Description}
                //                             <br/>
                //                             <strong>Manufacturer:</strong> {dataItem[0].data.Manufacturer}
                //                             <br/><br/>
                //                             <strong>Price Breaks:</strong>
                //                             <br/>

                //                             <table>
                //                                 <thead>
                //                                     <tr>
                //                                         <th>Quantity</th>
                //                                         <th>Price</th>
                //                                         <th>Currency</th>
                //                                     </tr>
                //                                 </thead>
                //                                 <tbody>
                //                                     {dataItem[0].data.Price.map((price,ind) => (
                //                                         <tr key={ind}>
                //                                             <td>{price.Quantity}</td>
                //                                             <td>{price.Price}</td>
                //                                             <td>{price.Currency}</td>
                //                                         </tr>
                //                                     ))}
                //                                 </tbody>
                //                             </table>

                //                             </>
                //                         ) : (
                //                             <>
                //                                 <strong>Error:</strong> {dataItem[0].ErrorToDisplay}
                //                             </>
                //                         )

                //                         } 
                //                     </div>
                //                 </div>
                //             <br/>
                //             <hr/>
                //         </div>
                //         )

                //     ))}
                // </div>
            
                )}
            </div>
        </div>
    );
};

export default PartNumber;