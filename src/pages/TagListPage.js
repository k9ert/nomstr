import { useQuery } from '@apollo/client';
import { GET_TAGS } from "../queries"
import { TagList } from "../components/TagList"

const TagListPage = (props) => {

    const { loading, error, data } = useQuery(GET_TAGS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <>
            <div className="col-span-6 ">
                <TagList tags={data.tags}/>
            </div>
            
        </>
    );
}

export {TagListPage}