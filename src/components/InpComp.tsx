import { InputHTMLAttributes } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {

}



const InpComp=({...rest}:IProps) =>{
  return (
    <div className="w-full" >
  <input className="border-2 rounded-md w-full p-1 border-indigo-800 focus:outline-none " {...rest} />
  
    </div>
  )
}

export default InpComp