interface IProps {

    msg:string,
    

}

const ErrorComp=({msg}:IProps) =>{
  return (
    <>
    {msg? <div> <span className="block text-red-700 font-semibold text-sm" >{msg}</span></div>:null}
    </>
  )
}

export default ErrorComp