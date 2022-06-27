import AlterNavAdmin from '../../../Components/Global/AlterNavAdmin';
import FoodsTable from '../../../Components/AdminPage/FoodsOperations/FoodsTable';

const AvailableFoodsOperations = () => {
    return (
        <>
            <AlterNavAdmin />
            <div className='table-zone'>
                <FoodsTable />
            </div>
            
        </>
    )
}

export default AvailableFoodsOperations;