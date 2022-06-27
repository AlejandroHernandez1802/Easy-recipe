import AlterNavAdmin from '../../../Components/Global/AlterNavAdmin';
import CategoriesTable from '../../../Components/AdminPage/CategoriesOperations/CategoriesTable';

const CategoriesOperations = () => {
    return (
        <>
            <AlterNavAdmin />
            <div className='table-zone'>
                <CategoriesTable />
            </div>
        </>
    )
}

export default CategoriesOperations;