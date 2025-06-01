import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../utils/loaderSlice";

const UserCard = ({user, fetchFeed}) => {
    const dispatch = useDispatch();
    const {firstName, lastName, about, gender, age, skills, photoUrl, isDummy, _id:toUserId, isPremium} = user || {};
    const allowedStatuses = ['interested', 'ignored'];
    const handleConnection = async (status) => {
        dispatch(toggleLoading(true));
        try{
            status = allowedStatuses[+status];
            await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, {}, {withCredentials:true});
            dispatch(toggleLoading(false));
            fetchFeed();
        }
        catch(error){
            dispatch(toggleLoading(false));
        }
    }
    return <>
        <div className="card card-xl bg-base-300 w-96 shadow-sm">
            <figure className="px-10 pt-10 h-[450px]">
                <img
                src={photoUrl}
                alt={firstName}
                className="rounded-xl cursor-zoom-in h-full w-auto object-cover" onClick={() => document.getElementById(toUserId).showModal()} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}, {age}{isPremium ? <img style={{width: '25px', background: '#683c00', borderRadius: '50%', padding: '3px'}} src='https://cdn-icons-png.flaticon.com/512/9967/9967681.png' /> : <></>}</h2>
                <p>{about}</p>
                {
                    !isDummy &&
                    <div className="card-actions flex gap-10 mt-5 justify-center">
                        <button className="btn btn-circle bg-amber-300 btn-xl border-yellow-700 border-4" onClick={() => handleConnection(0)}>
                            <img className="p-2" src="https://www.vectorkhazana.com/assets/images/products/Love_Heart.png" />
                        </button>
                        <button className="btn btn-warning bg-red-200 btn-circle btn-xl border-red-500 border-4" onClick={() => handleConnection(1)}>
                            <img className="p-2" src="https://upload.wikimedia.org/wikipedia/commons/1/10/Button_cancel.svg" />
                        </button>
                    </div>
                }
            </div>
        </div>

        <dialog id={toUserId} className="modal">
            <div className="modal-box">
                <img
                src={photoUrl}
                alt={firstName}
                className="rounded-xl my-5 mx-auto" />
                <h3 className="font-bold text-lg">{firstName} {lastName}, {age}</h3>
                <p className="py-4">
                    {about}
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
}

export default UserCard;