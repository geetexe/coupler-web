import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { toggleLoading } from "../utils/loaderSlice";

const EditProfile = ({user}) => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const saveProfile = async () => {
        dispatch(toggleLoading(true));
        setError('');
        try{
            const res = await axios.patch(`${BASE_URL}/profile/edit`, {
                firstName, lastName, age, about, gender, photoUrl
            }, { withCredentials: true });
            dispatch(toggleLoading(false));
            setNotification(res?.data?.message);
            setTimeout(() => setNotification(""), 3000);
            dispatch(addUser(res?.data?.user));
        }
        catch(err){
            setError(err?.response?.data);
            dispatch(toggleLoading(false));
            setNotification(err?.data?.message || err?.message);
            setTimeout(() => setNotification(""), 3000);
        }
    }

    return user && <div className="flex items-center justify-center p-10 gap-5">
        {notification && <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>{notification}</span>
            </div>
        </div>}
        <UserCard user={{firstName, lastName, gender, age, about, photoUrl, isDummy:true, _id:user._id}} />
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Edit Profile</legend>
            
            <label className="fieldset-label">First Name</label>
            <input type="text" className="input" placeholder="" onChange={e => setFirstName(e.target.value)} value={firstName} />
            
            <label className="fieldset-label">Last Name</label>
            <input type="text" className="input" placeholder="" onChange={e => setLastName(e.target.value)} value={lastName} />
            
            <label className="fieldset-label">Age</label>
            <input type="number" className="input" placeholder="" onChange={e => setAge(e.target.value)} value={age} />
            
            <label className="fieldset-label">About</label>
            <input type="text" className="input" placeholder="" onChange={e => setAbout(e.target.value)} value={about} />
            
            <label className="fieldset-label">Gender</label>
            <input type="text" className="input" placeholder="" onChange={e => setGender(e.target.value)} value={gender} />
            
            <label className="fieldset-label">Photo URL</label>
            <input type="text" className="input" placeholder="" onChange={e => setPhotoUrl(e.target.value)} value={photoUrl} />

            { error && <p className="text-red-500">{error}</p> }
            
            <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save Profile</button>
        </fieldset>
    </div>
}

export default EditProfile;