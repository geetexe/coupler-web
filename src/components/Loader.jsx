const Loader = () => {
    return <>
        <div className="h-[100vh] w-[100vw] absolute z-50 opacity-65 bg-amber-200 top-0 left-0 flex align-center justify-center pointer-events-none">
            <span className="loading loading-spinner w-[100px] text-error"></span>
        </div>
    </>
}

export default Loader;