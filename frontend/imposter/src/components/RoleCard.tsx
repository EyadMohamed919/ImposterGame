
function RoleCard({isImposter}:{isImposter:boolean}) {
  return (
    <div className="w-50 h-70 flex justify-center items-center rounded-2xl shadow-blue-800 from-red-600 to-orange-500 bg-linear-to-br">
        {isImposter ? (<p>You are imposter</p>):(<p>You are a member</p>)}
    </div>
  )
}

export default RoleCard