import './Css/Forms.css';
import FormInputs from '../../Components/AdminPage/RegisterForm/FormInputs';
import AlterNav from '../../Components/Global/AlterNav';

import { Link, useHistory } from 'react-router-dom';
import{useState} from 'react';
import axios from 'axios';

const RegisterAdminPage = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Write your username",
            errorMssg: "Username should be 3-20 characters and shouldn't include any special character!",
            label:"Username",
            pattern:"^[A-Za-z0-9]{3,20}$",
            required:true
        },
        {
            id:2,
            name:"email",
            type:"email",
            placeholder:"Registration email",
            errorMssg: "It should be a valid email address",
            label:"Email",
            required:true
        },
        {
            id:3,
            name:"password",
            type:"password",
            placeholder:"Don't forget it",
            errorMssg: "Your password should be 8-20 characters and it should include 1 letter, 1 number and 1 special character",
            label:"Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!.@#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,20}`,
            required:true
        },
        {
            id:4,
            name:"confirmPassword",
            type:"password",
            placeholder:"Repeat it",
            errorMssg: "Passwords don't match",
            label:"Confirm password",
            pattern: values.password,
            required:true
        }
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const registerAdmin = (e) => {
        e.preventDefault();

        let canRegister = {
            userNameOk:false,
            emailOk:false,
            passwordOk:false
        }

        if(values.username === "" && values.email === "" && values.password === "" && values.confirmPassword === ""){
            alert("Debes llenar todos los campos para registrar un nuevo perfil de administrador.");
        }
        else{
            if(/^[A-Za-z0-9]{3,20}$/.test(values.username) === true){
                canRegister.userNameOk = true;
            }
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email) === true){
                canRegister.emailOk = true;
            }
            if(/^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!.@#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,20}/.test(values.password) === true){
                if(values.confirmPassword === values.password){
                    canRegister.passwordOk =  true;
                }
            }
            if(canRegister.userNameOk === true && canRegister.emailOk === true && canRegister.passwordOk === true){
                axios.post("http://localhost:3001/api/adminRegister", {AdminName:values.username, AdminEmail:values.email, AdminPassword:values.password}).then(() => {
                    alert("Te estamos registrando en nuestra base de datos, espera un segundo.");
                    history.push('/login-admin');
                })
            }
            else{
                alert("Hay uno o más errores en las credenciales que ingresaste. Vuelve a intentarlo solucionando estos errores.");
            }
        }
    }

    return(
        <>
            <AlterNav />
            <div className="adminp-content">
                <div className='form-container'>   
                    <form>
                        <div className='form-content'>
                            <h1 className='form-title'>Register</h1>
                            {inputs.map(input => (
                                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                            <div className='form-buttons'>
                                <button className='form-button' type='submit' onClick={registerAdmin}>Register a new admin</button>
                                <Link to={{pathname: "/login-admin"}}><button className='form-button'>Login</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default RegisterAdminPage;