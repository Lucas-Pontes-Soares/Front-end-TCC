export function Input({type, placeholder, name, id}){
    return(
        <div className='card'>
            <input type={type} placeholder={placeholder} name={name} id={id}></input>
        </div>
    )
}