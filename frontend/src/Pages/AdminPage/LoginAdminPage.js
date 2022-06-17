import './Css/Forms.css';
import FormInputs from '../../Components/AdminPage/RegisterForm/FormInputs';
import AlterNav from '../../Components/Global/AlterNav';
import{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterAdminPage = () => {

    const [values, setValues] = useState({
        email:"",
        password:"",
    });

    const inputs = [
        {
            id:1,
            name:"email",
            type:"text",
            placeholder:"Put you email",
            label:"Email"
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Put your password",
            label:"Password"
        }
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const loginAdmin = (e) => {
        e.preventDefault();

        let loginValues;
        axios.get("http://localhost:3001/api/adminLogin", {params:{email:values.email, password:values.password}}).then((response) => {
            loginValues = response.data
            if(loginValues.length === 0){
                alert("Sorry, there is no admin profiles registered with those credentials.")
            }
            else{
                console.log("Correct access");
            }
        })        
    }

    return(
        <>
            <AlterNav />
            <div className="adminp-content">
                <div className='form-container'>   
                    <form>
                        <div className='form-content'>
                            <h1 className='form-title'>Login</h1>
                            {inputs.map(input => (
                                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                            <div className='form-buttons'>
                                <button className='form-button' type='submit' onClick={loginAdmin}>Login</button>
                                <Link to={{pathname: "/register-admin"}}><button className='form-button'>Register a new admin</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default RegisterAdminPage;