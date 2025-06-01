import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../utils/loaderSlice";

const RequestCard = ({user, fetchRequests}) => {
    const { firstName, lastName, age, gender, about, photoUrl, requestId, isPremium } = user;
    const dispatch = useDispatch();
    const reviewTypes = ['accepted', 'rejected'];
    const reviewRequest = async (status) => {
        dispatch(toggleLoading(true));
        try{
            status = reviewTypes[+status];
            await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials:true });
            dispatch(toggleLoading(false));
            fetchRequests();
        }
        catch(error){
            dispatch(toggleLoading(false));
        }
    }
    return <>
        <div className="card lg:card-side bg-base-300 shadow-sm">
            <figure className="w-[300px]">
                <img 
                src={photoUrl}
                alt={firstName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}, {age}{isPremium ? <img style={{width: '25px', background: '#683c00', borderRadius: '50%', padding: '3px'}} src='https://cdn-icons-png.flaticon.com/512/9967/9967681.png' /> : <></>}</h2>
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => reviewRequest(0)}>Accept</button>
                    <button className="btn btn-secondary" onClick={() => reviewRequest(1)}>Reject</button>
                </div>
            </div>
        </div>
    </>
}

export default RequestCard;