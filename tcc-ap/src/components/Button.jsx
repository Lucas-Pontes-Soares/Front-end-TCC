export function Button({value, onclickFunction}){
    return(
        <div className='card'>
            <input type="submit" value={value} onClick={onclickFunction}/>
        </div>
    )
}