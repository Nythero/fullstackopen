const InputField = ({ name, input }) => {
  return (
    <>
      <label className='form-label text-light' htmlFor={`${name}-input`}>{name}</label>
      <input className='form-control w-25' id={`${name}-input`} {...input}></input>
    </>
  )
}

export default InputField
