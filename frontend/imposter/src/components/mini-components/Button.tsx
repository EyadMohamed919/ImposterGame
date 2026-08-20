
function Button(
    {onClick, bgColor, borderColor, bgHoverColor, borderHoverColor, textColor, textHoverColor}:
    {onClick:any, bgColor:string, borderColor:string, bgHoverColor:string, borderHoverColor:string, textColor:string, textHoverColor:string}) {
  
  let style = "flex flex-row justify-center items-center  hover:border-solid border-2  transition-all duration-300 m-auto mt-3 px-5 p-3 rounded-full ";
  style += bgColor + " " + borderColor + " " + bgHoverColor + " " + borderHoverColor + " " + textColor + " " + textHoverColor;
  return (
    <button onClick={()=>onClick()} className={style}>Start Game</button>
  )
}
// text-white hover:cursor-pointer hover:bg-white hover:border-green-700 hover:text-green-500 bg-green-700/70
export default Button