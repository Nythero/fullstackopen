const InputField = ({ name, input }) => {
  return (
    <>
      <label htmlFor={`${name}-input`}>{name}</label>
      <input id={`${name}-input`} {...input}></input>
      <br />
    </>
  )
}

export default InputField
