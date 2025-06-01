import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { toggleLoading } from "../utils/loaderSlice";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);
    const [isLoading, setIsLoading] = useState(true);
    const fetchFeed = async () => {
        setIsLoading(true);
        dispatch(toggleLoading(true));
        try{
            const res = await axios.get(`${BASE_URL}/feed?limit=50`, { withCredentials: true });
            const {users} = res?.data;
            if(Array.isArray(users) && users?.length > 1){
                for(let i=0; i<users.length/2; i++){
                    const randomIdx = Math.floor(Math.random() * users.length);
                    [users[i], users[randomIdx]] = [users[randomIdx], users[i]];
                }
            }
            dispatch(addFeed(users));
            setIsLoading(false);
            dispatch(toggleLoading(false));
        } catch(err) {
            setIsLoading(false);
            dispatch(toggleLoading(false));
        }
    }
    
    useEffect(() => {
        setIsLoading(false);
        !feed?.length && fetchFeed();
    }, []);

    if(!feed?.length && !isLoading){
        return <div className="h-full flex items-center justify-center text-center">
            Oops! It seems like no users are available right now.<br />
            Please check after sometime.
        </div>
    }

    return (feed && !isLoading) && (<>
        <div className="flex h-full justify-center items-center">
            <UserCard user={feed[0]} fetchFeed={fetchFeed} />
        </div>
    </>)
}

export default Feed;