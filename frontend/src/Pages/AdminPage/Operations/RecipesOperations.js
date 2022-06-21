import AlterNav from '../../../Components/Global/AlterNav';
import RecipesTable from '../../../Components/AdminPage/RecipesOperations/RecipesTable';

const RecipesOperations = () => {    

    return (
        <>
            <AlterNav />
            <div className='table-zone'>
                <RecipesTable />
            </div>
            
        </>
    )
}

export default RecipesOperations;