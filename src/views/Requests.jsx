import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleLoading } from "../utils/loaderSlice";
import { setRequests } from "../utils/requestsSlice";
import RequestCard from "../components/RequestCard";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);

    const fetchRequests = async () => {
        dispatch(toggleLoading(true));
        try{
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            const requests = res?.data?.data || [];
            dispatch(toggleLoading(false));
            dispatch(setRequests(requests));
        }
        catch(error){
            dispatch(setRequests([]));
            dispatch(toggleLoading(false));
        }

    }
    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

    if(!requests?.length){ 
        return <div className="h-[80vh] flex justify-center items-center text-center">
            You don't have any requests received as of now.<br/>
            Please check again later!
        </div>
    }

    return requests && <>
        <h1 className="m-5 text-4xl">Requests ({requests?.length})</h1>
        <div className="flex justify-between flex-col w-1/2 m-auto gap-5">
        {
            requests?.map(user => {
                user = {...user.fromUserId, requestId: user._id};
                return <RequestCard key={user?._id} user={user} fetchRequests={fetchRequests} />
            })
        }
        </div>
    </>
}

export default Requests;