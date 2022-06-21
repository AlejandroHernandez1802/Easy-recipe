import AlterNav from '../../../Components/Global/AlterNav';
import CategoriesTable from '../../../Components/AdminPage/CategoriesOperations/CategoriesTable';

const CategoriesOperations = () => {
    return (
        <>
            <AlterNav />
            <div className='table-zone'>
                <CategoriesTable />
            </div>
        </>
    )
}

export default CategoriesOperations;