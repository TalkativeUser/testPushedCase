import { ButtonHTMLAttributes, ReactNode } from "react"
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
children:ReactNode,
classname?:string

}


const ButtonComp=({children,classname,...res}:IProps) =>{

    
    
    
  return (
 
             

             <button {...res} className={` ${classname}`} > {children}</button>
    
  )
}
export default ButtonComp