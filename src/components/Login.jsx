import { useEffect } from "react";
// import {useCookies} from "react-cookie";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from 'antd';


const Login = () => {
    const navigate = useNavigate();

    const onRegister = () => {
        navigate("/signup");
    }

    const initialValues = { email: "",
                            password: "",
                        };
    
    const onSubmit = async (values, {setSubmitting}) => {
        console.log("onSubmit in login = ",values);
        setSubmitting(false);

        try {
            console.log("Going to send the credentials")
            const response = await axios.post("/api/authenticate/login", values, {withCredentials: true});
            console.log("Response = ",response);

            if (response.data.success){
                console.log("Login successful");
                navigate("/get");
            } else {
                if (response.data.message === "wrong_password"){
                    message.error("Login Failed - Wrong Password");

                } else if (response.data.message === "no_user") {
                    message.error("User not found - Please Register");
                }
            }
        } catch (e) {
            console.error("Error during login ", e);
            // message that registration is unsuccessfull
            message.error("Login unsuccessful");
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        
        password: Yup.string()
            .required("Password is required")
            .min(8,"Password must be at least 8 characters"),
    })
    // const [cookies,setCookie] = useCookies(["exeb2b-cookie"]);

    // const setCookieValue = async () =>{
    //     const cookieVal = await axios.post("/api/authenticate/setCookie", {withCredentials: true}); //http://localhost:3013/authenticate/setCookie

    //     if (cookieVal.data){
    //         console.log("Cookie val : ",cookieVal.data);
    //         navigate("/get");
    //     } else {
    //         console.log("Error setting Cookie");
    //     }
    // }

    // useEffect (() => {
    //     setCookieValue();

    // },[]);

    return (
        <div className='Login'>
            <h1>Login</h1>

            <Formik
                initialValues = {initialValues}

                validationSchema = {validationSchema}

                onSubmit = {onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='form-group'>
                            <label htmlFor='email'>Email: </label>
                            <Field
                                type = "text"
                                name = "email"
                                placeholder = "Enter email address"
                            />
                            <ErrorMessage name="email" component="span" className='error-message'/>
                        </div>

                        <br/>

                        <div className="form-group">
                            <label htmlFor='password'>Password: </label>
                            <Field
                                type = "password"
                                name = "password"
                                placeholder = "Enter password"
                            />
                            <ErrorMessage name="password" component="span" className="error-message"/>
                        </div>
                        <br/>

                        <button
                            type = "submit"
                            disabled = {isSubmitting}
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
            <br/>
            <button
                onClick={onRegister}
            >
                Register
            </button>
        </div>
    )

}

export default Login;