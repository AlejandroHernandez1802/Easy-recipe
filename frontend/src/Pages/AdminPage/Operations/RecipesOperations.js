import AlterNavAdmin from '../../../Components/Global/AlterNavAdmin';
import RecipesTable from '../../../Components/AdminPage/RecipesOperations/RecipesTable';

const RecipesOperations = () => {    

    return (
        <>
            <AlterNavAdmin />
            <div className='table-zone'>
                <RecipesTable />
            </div>
            
        </>
    )
}

export default RecipesOperations;