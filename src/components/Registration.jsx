import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


const Registration = () => {
    const navigate = useNavigate();

    const onLogin = () => {
        navigate("/login");
    }

    const initialValues = { email: "",
                            password: "",
                            confirm_password: ""
                        };

    const onSubmit = async (values,{setSubmitting}) => {
        console.log("onSubmit = ",values);
        setSubmitting(false);

        try{
            const response = await axios.post("https://dummy-zionix-backend3.onrender.com/authenticate/register", values, {withCredentials: true});
            console.log("response = ",response);

            if (response.data.success){
                console.log("Registration Successful");
                navigate("/get");

            } else {
                // console.error("Registration unSuccessful");
                // Message User already registered, please login
                // Show a button to go to the Login Page
                message.error("Email already registered! Please login");
            }

        } catch (error) {
            console.error("Error during registration: ", error);
            // message that registration is unsuccessfull
            message.error("Registration unsuccessful");
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        
        password: Yup.string()
            .required("Password is required")
            .min(8,"Password must be at least 8 characters"),
        
        confirm_password: Yup.string()
            .required('Please retype your password')
            .oneOf([Yup.ref('password')], "Your passwords do not match"),
    })



    return (
        <div className='Registration'>
            <h1>Register a new account</h1>

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

                        <div className="form-group">
                            <label htmlFor='confirm_password'>Confirm Password: </label>
                            <Field
                                type = "password"
                                name = "confirm_password"
                                placeholder = "Confirm password"
                            />
                            <ErrorMessage name="confirm_password" component="span" className="error-message"/>
                        </div>
                        <br/>

                        <button
                            type = "submit"
                            disabled = {isSubmitting}
                        >
                            Submit
                        </button>





                    </Form>
                )}
            </Formik>
            <br/>
            <button
                onClick={onLogin}
            >
                Login
            </button>
        </div>
    )

}

export default Registration;