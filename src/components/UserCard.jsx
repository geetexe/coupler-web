const PLACEHOLDER_URL = 'https://whitedotpublishers.com/wp-content/uploads/2022/05/male-placeholder-image.jpeg';
const UserCard = ({user}) => {
    const {firstName, lastName, about, gender, age, skills, photoUrl, isDummy} = user || {};
    return <>

        <div className="card bg-base-300 w-96 my-4 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                src={photoUrl}
                alt={firstName}
                className="rounded-xl" />
            </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName} {lastName}, {age}</h2>
            <p>{about}</p>
            {
                !isDummy &&
                <div className="card-actions flex gap-10 mt-5 justify-center">
                    <button className="btn btn-circle bg-amber-300 btn-xl border-yellow-700 border-4">
                        <img className="p-2" src="https://www.vectorkhazana.com/assets/images/products/Love_Heart.png" />
                    </button>
                    <button className="btn btn-warning bg-red-200 btn-circle btn-xl border-red-500 border-4">
                        <img className="p-2" src="https://upload.wikimedia.org/wikipedia/commons/1/10/Button_cancel.svg" />
                    </button>
                </div>
                }
        </div>
        </div>

        {/* <div className="card bg-base-300 w-96 shadow-sm m-4">
            <figure className="">
                {
                    photoUrl && <img src={photoUrl} alt={firstName} />
                }
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}, {age}</h2>
                <p>{about}</p>
                {
                    !isDummy && 
                    <div className="card-actions justify-center mt-5">
                        <button className="btn btn-circle btn-accent">❤️</button>
                        <button className="btn btn-ghost btn-circle">🚫</button>
                    </div>
                }
            </div>
        </div> */}
    </>
}

export default UserCard;