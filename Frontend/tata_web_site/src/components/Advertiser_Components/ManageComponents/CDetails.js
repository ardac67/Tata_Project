import {useParams} from 'react-router-dom';
const CDetails = () => {
    const { id } = useParams()
    return (
        <div>{id}</div>
    )
}

export default CDetails;