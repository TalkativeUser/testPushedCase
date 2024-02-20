interface IProps {

    imgUrl:string,
    alt:string,
    classname:string

}



const ImgComp=({imgUrl,alt,classname}:IProps) =>{
  return (
    <div>
              <img className={classname} src={imgUrl} alt={alt} />
    </div>
  )
}

export default ImgComp