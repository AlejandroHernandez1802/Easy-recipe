import './Style/SelectOperation.css';
import AlterNav from '../../../../Components/Global/AlterNav';
import { Link } from 'react-router-dom';

const SelectOperation = () =>{

    return (
        <>
            <AlterNav />
            <div className="select-operation-page-content">
                <Link to={{pathname:"/categories-operations"}}>
                    <div className='operations-columns categories'>
                        <div className='text-container'>
                            <h1 className='selectOp-text'>Administrar categorías</h1>
                        </div>
                    </div>
                </Link>
                
                <Link to={{pathname:"/foods-operations"}}>
                    <div className='operations-columns foods'>
                        <div className='text-container'>
                            <h1 className='selectOp-text'>Administrar alimentos</h1>
                        </div>
                    </div>
                </Link>

                <Link to={{pathname:"/recipes-operations"}}>
                    <div className='operations-columns recipes'>
                        <div className='text-container'>
                            <h1 className='selectOp-text'>Administrar recetas</h1>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )

}

export default SelectOperation;