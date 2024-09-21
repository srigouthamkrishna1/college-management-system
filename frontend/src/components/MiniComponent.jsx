const MiniComponent=({description})=>{
    return(
        <div className="h-[80px] hover:shadow-md  mt-2 cursor-pointer text-gray-700 flex items-center justify-center ">
            {description}
        </div>
    )
}
export default MiniComponent;