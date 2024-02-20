import ImgComp from "./ImgComp"
import ButtonComp from "./ButtonComp"
import { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/stringCut"
import CircleColors from "../CircleColors/CircleColors"
interface IProps {

product:IProduct,
setProductToEdit:( product:IProduct )=>void ,
openEditModal:()=>void ,
setIndexProduct:(value:number)=>void,
index:number,
setIsOpenRemoveModal:(value:boolean)=>void,


}

 const ProductCard=({product,setProductToEdit,openEditModal,setIndexProduct,index,setIsOpenRemoveModal}:IProps) =>{

  
 
  const {title,imageURL,description,price,colors,category}=product;

 const onProductEdit=()=>{

setProductToEdit(product)
openEditModal();
setIndexProduct(index)

 }






 const onProductRemove =()=> {

  setProductToEdit(product)
  setIsOpenRemoveModal(true)



 }

  const renderCircleColors=colors.map( (color,index)=><CircleColors color={color} key={index}   ></CircleColors> )
  return (
    <div className="border-2 rounded-md p-2 flex flex-col mx-auto  " >

       <ImgComp classname="rounded-lg" imgUrl={imageURL} alt="product name" />
       <h3>{title}</h3>
<p>{txtSlicer(description)}</p>

        <div className="py-3 flex items-center space-x-2 " > {renderCircleColors} </div>
        <div className="py-3 flex items-center space-x-2 justify-between " >

         <span>{price}</span>
      <img className="h-10 w-10 rounded-full" src={category.imageURL} alt="" />
        </div>

        <div className=" flex mt-2 space-x-2" >


<ButtonComp classname="bg-indigo-800 p-1 w-full rounded-md text-white"  onClick={ onProductEdit}>Edit</ButtonComp>
<ButtonComp classname="bg-red-600 p-1 w-full rounded-md text-white"     onClick={ onProductRemove}>Delete</ButtonComp>

        </div>
             
    </div>
  )
}


export default ProductCard