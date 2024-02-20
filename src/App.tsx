import ProductCard from "./components/ProductCard"
import { productList,formInputsList, categories } from "./data"
import MyModal from "./components/Modal"
import { FormEvent, useState } from "react"
import ButtonComp from "./components/ButtonComp"
import InpComp from "./components/InpComp"
import { ChangeEvent } from "react"
import { IProduct } from "./interfaces"
import { productValidation } from "./Validation/Validation"
import ErrorComp from "./ErrorComp/ErrorComp"
import { colors } from "./data"
import CircleColors from "./CircleColors/CircleColors"
import { v4 as uuid } from "uuid";
import Select from "./components/SelectUi"
import { ProductNameTypes } from "./Type/Type"
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const defaultProductObj={ title:"",description:"",imageURL:"", price:"" ,colors:[],category:{name:"",imageURL:"" }};
  const [isOpen, setIsOpen] = useState(false)
  const [product,setProduct]=useState<IProduct>(defaultProductObj)
  const [products,setProducts]=useState<IProduct[]>(productList)
  const [Error,setError]=useState({title:"",description:"",imageURL:"", price:"",color:""})
const [tempColor,setTempColor]=useState<string[]>([])
  const [selecteCategory, setSelecteCategory] = useState(categories[0])
const [isOpenEditModal,setIsOpenEditModal]=useState(false)
const [productToEdit,setProductToEdit]=useState<IProduct>(defaultProductObj)
const [indexProduct,setIndexProduct]=useState<number>(0)
const [isOpenRemoveModal,setIsOpenRemoveModal]=useState<boolean>(false)
const notify = () => toast('Here is your toast.');


const renderCircleColors=colors.map( (color,index)=><CircleColors color={color} key={index} onClick={()=>{   

              if(tempColor.includes(color)){

            setTempColor((prev)=> prev.filter(item => item!== color))
                     return;
              }
              
              if(productToEdit.colors.includes(color)){

            setTempColor((prev)=> prev.filter(item => item!== color))
                       return;
              }
              
              
                              setTempColor((prev)=>[...prev,color])
              
              

            } } ></CircleColors> )




    const onChangeEditHandler=(event:ChangeEvent<HTMLInputElement>)=> {  
  

  const {value,name}=event.target
  
  setProductToEdit( {  ...productToEdit, [name]:value })
  setError( { ...Error , [name]:"" })
  
  
     }
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=> {  
  

  const {value,name}=event.target
  
  setProduct( { ...product , [name]:value })
  setError( { ...Error , [name]:"" })
  
  
     }



     const onCancel =()=> {


console.log('canceled');
setProduct(defaultProductObj)
closeModal()

     }
     const onCancelEdit =()=> {


console.log('canceled');
setProductToEdit(defaultProductObj)
closeModalEdit()

     }





     const submitdEditHandler=(event:FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    
    
    const errors=productValidation({title:productToEdit.title,description:productToEdit.description,imgURL:productToEdit.imageURL,price:productToEdit.price,colors:productToEdit.colors})

const hasErrorMsg=Object.values(errors).some(value=> value==='')&&Object.values(errors).every(value=> value==='')

if(!hasErrorMsg) {
  
  setError(errors)
console.log('there is one error in validation',errors);

  return }

  // الاربع اسطر دول هيتنفذو فى حاله ان الفورم اتملت وكله تمام مفيش ولا حقل فاضى 
const upDatedProducts=[...products]
upDatedProducts[indexProduct]={...productToEdit,colors:tempColor.concat(productToEdit.colors)}
setProducts(upDatedProducts)

setProductToEdit(defaultProductObj)
setTempColor([])

closeEditModal()


     }
    
     const submitdHandler=(event:FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    console.log( 'before validation', product);
    const errors=productValidation({title:product.title,description:product.description,imgURL:product.imageURL,price:product.price,colors:tempColor})
console.log('after validation', errors);
console.log( 'after validation', product);

const hasErrorMsg=Object.values(errors).some(value=> value==='')&&Object.values(errors).every(value=> value==='')

if(!hasErrorMsg) {
  
  setError(errors)
  return }

  // الاربع اسطر دول هيتنفذو فى حاله ان الفورم اتملت وكله تمام مفيش ولا حقل فاضى 

setProducts((prev)=>[{...product,id:uuid(),colors:tempColor,category:selecteCategory},...prev])
setProduct(defaultProductObj)
setTempColor([])
closeModal()


     }
    
const removeProductHandler=()=>{

const filltered=products.filter( product=> product.id!==productToEdit.id)  
setProducts(filltered)
closeRemoveModal()
notify()
  
}




  const renderProductList=products.map( (product,index)=> <ProductCard 
   key={index} product={product} openEditModal={openEditModal} setProductToEdit={setProductToEdit} index={index} setIndexProduct={setIndexProduct}  setIsOpenRemoveModal={setIsOpenRemoveModal}                                        />)

  const renderFormInputList=formInputsList.map( (input,index)=> { return <div key={index} className="flex items-start flex-col mb-[12px] ">    

    

              <label className="" htmlFor={input.id}>{input.label}</label>
              <InpComp  type={input.type} id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} ></InpComp> 
              <ErrorComp msg={Error[input.name]} ></ErrorComp>

        </div> })


 const renderProductEditWithErrorMsg=(id:string,label:string,name:ProductNameTypes)=>{

 return (  
  <div className="flex items-start flex-col mb-[12px] ">    

  <label className="" htmlFor={id}>{label}</label>
  <InpComp  type='text' id={id} name={name} value={productToEdit[name]}  onChange={onChangeEditHandler} ></InpComp> 
  <ErrorComp msg=''></ErrorComp>

</div>

 )



 }


  function closeModal() {
    setIsOpen(false)
  }
  function closeModalEdit() {
    setIsOpenEditModal(false)
  }

  function closeRemoveModal() {
    setIsOpenRemoveModal(false)
  }

  function openModal() {
    setIsOpen(true)
  }
 




  function openEditModal() {
    setIsOpenEditModal(true)
  }


  return (
  <>
<div className="container mx-auto text-center">

<ButtonComp classname="bg-green-700 hover:bg-green-600 my-4 w-96 p-1 rounded-md text-white text-center mx-auto " onClick={openModal} > Add </ButtonComp>


<div className="border-2   border-red-700 m-5 grid xl:grid-cols-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 p-2 " >
    
    {renderProductList}

  </div>
  
{/* add product modal  */}

<MyModal isOpen={isOpen} closeModal={closeModal} title="Add a new product " >   

<form onSubmit={submitdHandler}> 

{renderFormInputList}
<Select selected={selecteCategory} setSelected={setSelecteCategory} ></Select>

<div className="flex justify-between p-2" >{renderCircleColors}</div>
<ErrorComp msg={Error.color} ></ErrorComp>


<div className="flex justify-start flex-wrap p-2" >{ tempColor.map((color,index)=> <span key={index} style={{backgroundColor:color}} className="rounded-md p-1 m-1" >{color}</span> )    }</div>



<div className="flex items-center mt-5 space-x-4"  >
<ButtonComp classname="bg-indigo-800 hover:bg-indigo-500 p-1 w-full rounded-md text-white"  type="button" onClick={onCancel}> cancel </ButtonComp>
<ButtonComp classname="bg-red-600 hover:bg-red-400 p-1 w-full rounded-md text-white"> supmit </ButtonComp>
</div>





</form>
</MyModal>



{/* Edit product modal  */}

<MyModal isOpen={isOpenEditModal} closeModal={closeModalEdit} title="Edit on product " >   

<form onSubmit={submitdEditHandler}> 

    {renderProductEditWithErrorMsg('title','product title','title')}
    {renderProductEditWithErrorMsg('description','product description','description')}
    {renderProductEditWithErrorMsg('imageURL','product imageURL','imageURL')}
    {renderProductEditWithErrorMsg('price','product price','price')}


<Select selected={productToEdit.category} setSelected={value=>setProductToEdit({...productToEdit,category:value})} ></Select>

<div className="flex justify-between p-2" >{renderCircleColors}</div>
{/* <ErrorComp msg={Error.color} ></ErrorComp> */}


<div className="flex justify-start flex-wrap p-2" >{ tempColor.concat(productToEdit.colors).map((color,index)=> <span key={index} style={{backgroundColor:color}} className="rounded-md p-1 m-1" >{color}</span> )    }</div>


<div className="flex items-center mt-5 space-x-4"  >
<ButtonComp classname="bg-indigo-800 hover:bg-indigo-500 p-1 w-full rounded-md text-white"  type="button" onClick={onCancelEdit}> cancel </ButtonComp>
<ButtonComp classname="bg-red-600 hover:bg-red-400 p-1 w-full rounded-md text-white" > supmit </ButtonComp>
</div>





</form>
</MyModal>


{/* remove product modal  */}
<MyModal isOpen={isOpenRemoveModal} closeModal={closeRemoveModal} title="Are you sure Remove product " >   

<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, suscipit placeat.</p>

<div className=" flex mt-4 space-x-2" >


<ButtonComp classname="bg-indigo-800 p-1 w-full rounded-md text-white"  >Cancel</ButtonComp>
<ButtonComp classname="bg-red-600 p-1 w-full rounded-md text-white" onClick={removeProductHandler} >Yes Deleted</ButtonComp>

        </div>
</MyModal>

<Toaster />

</div>
  </>
  )
}

export default App

