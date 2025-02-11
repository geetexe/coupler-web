import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { toggleLoading } from "../utils/loaderSlice";

const Feed = () => {
    const feed = useSelector(store => store.feed);
    const dispatch = useDispatch();
    const fetchFeed = async () => {
        dispatch(toggleLoading(true));
        try{
            const res = await axios.get(`${BASE_URL}/feed?limit=50`, { withCredentials: true });
            dispatch(addFeed(res?.data?.users));
            dispatch(toggleLoading(false));
        } catch(err) {
            console.error(err);
            dispatch(toggleLoading(false));
        }
    }
    
    useEffect(() => {
        !feed.length && fetchFeed();
    }, []);

    return feed && (<>
        <div className="flex flex-wrap justify-between m-4">
            {
                feed?.map(userData => <UserCard key={userData?._id} user={userData} />)
            }
        </div>
    </>)
}

export default Feed;