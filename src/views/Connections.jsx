import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../utils/loaderSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeConnections, setConnections } from "../utils/connectionsSlice";
import UserCard from "../components/UserCard";

const Connections = () => {
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        dispatch(toggleLoading(true));
        try{
            const res = await axios.get(`${BASE_URL}/user/connections`, {withCredentials: true});
            const _connections = res?.data?.data || [];
            dispatch(setConnections(_connections));
            dispatch(toggleLoading(false));
        }
        catch(error){
            dispatch(removeConnections());
            dispatch(toggleLoading(false));
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;

    if(!connections.length){
        return <p>No connections found!</p>;
    }
    
    return connections && <>
        <h1 className="m-5 text-4xl">Connections ({connections?.length})</h1>
        <div className="flex justify-around">
            {
                connections.map(connection => {
                    return <UserCard user={{...connection, isDummy: true}} key={connection._id} />
                })
            }
        </div>
    </>
}

export default Connections;