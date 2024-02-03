// // Mouser keyword Search

// // import React from "react";
// import { useState } from "react";
// import axios from "axios";

// const HomePage = () =>{
//     const [keyword, setKeyword] = useState("");
//     const [result,setResult] = useState([]);

//     const getData = async () =>{
//         try{
//             const response = await axios.get('http://localhost:3013/api/mouser',{params: {keyword: keyword}});

//             const parts = response.data.SearchResults.Parts??[];
//             setResult(parts);

//         } catch(error){
//             console.log("Error : ",error);
//         }

//     }; 

//     return (
//         <div>
//             <h2>Get the Data</h2>

//             <label htmlFor="keyw">Enter Keyword: </label>
//             <input
//             type="text"
//             id="keyw"
//             placeholder="String"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             />
//             <button onClick={getData}>Get Info</button>

//             <hr />
//             <hr />

//             <div id="resElements">
//                 {result.map((part, index) => (
//                 <div key={index}>
//                     <strong>Availability:</strong> {part.Availability}
//                     <br />
//                     <strong>Description:</strong> {part.Description}
//                     <br />
//                     <strong>Price Breaks:</strong>
//                     <br />
//                     <table>
//                     <thead>
//                         <tr>
//                         <th>Quantity</th>
//                         <th>Price</th>
//                         <th>Currency</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {part.PriceBreaks.map((priceBreak, i) => (
//                         <tr key={i}>
//                             <td>{priceBreak.Quantity}</td>
//                             <td>{priceBreak.Price}</td>
//                             <td>{priceBreak.Currency}</td>
//                         </tr>
//                         ))}
//                     </tbody>
//                     </table>
//                     <hr />
//                 </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomePage;