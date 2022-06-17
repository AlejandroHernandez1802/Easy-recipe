import './Styles/FormInputs.css';


const FormInputs = (props) => {

    const {label, onChange, id, ...inputProps} = props;

    return(
        <> 
            <div className='form-inputs'>
                <label className='form-label'>{label}</label>
                <input {...inputProps} onChange={onChange}/>
            </div>
        </>
    )

}

export default FormInputs;