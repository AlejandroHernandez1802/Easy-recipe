import AlterNav from '../../../Components/Global/AlterNav';
import FoodsTable from '../../../Components/AdminPage/FoodsOperations/FoodsTable';

const AvailableFoodsOperations = () => {
    return (
        <>
            <AlterNav />
            <div className='table-zone'>
                <FoodsTable />
            </div>
            
        </>
    )
}

export default AvailableFoodsOperations;