
export const productValidation=(product:{title:string,description:string,imgURL:string,price:string,colors:string[]})=>{   

const errors:{ title:string,description:string,imageURL:string, price:string,color:string}={  title:"",description:"",imageURL:"", price:"",color:""}

const validUrl=/^(ftp|http|https):\/\/[^ "]+$/.test(product.imgURL)


if(!product.title.trim()||product.title.length<10||product.title.length>80) {

errors.title='product title must be between 10 and 80 characters'
}
if(!product.description.trim()||product.description.length<10||product.description.length>800) {

errors.description='product description must be between 10 and 900 characters'
}
if(!product.imgURL.trim()||!validUrl) {

errors.imageURL='img url is not valid and img url is required'
}
if(!product.price.trim()||isNaN(Number(product.price))) {

errors.price='price is not valid and price is required'
}

if(product.colors.length===0) {

    errors.color='please add any color for adding product'
}


return errors



}