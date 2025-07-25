import type { ReactElement } from "react"

interface ButtonProps{
    text:string
    startIcon:ReactElement,
    varient:"primary" | "secondary"
}
const varientProps={
    primary:"bg-blue-700 text-white",
    secondary:"bg-blue-200 text-blue-700"
}
const defaultStyles="px-6 cursor-pointer py-2 rounded-md w-46"
;
const Button = (props:ButtonProps) => {
  return (
    <div>
       
        <button className={`${varientProps[props.varient]} ${defaultStyles} flex items-center font-normal`}>  <div className="pr-3">{props.startIcon}</div>{props.text} </button>
    </div>
  )
}

export default Button
