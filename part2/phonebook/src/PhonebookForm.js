const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}> {text}</button>

const PhonebookForm = ({ newName, onNameChange, newPhone, onPhoneChange, onButtonClick }) => 
  <form>
    <h2>add a new entry</h2>
    <div>
      name: <input value={newName} onChange={onNameChange} />
      phone number: <input 
        value={newPhone}
        onChange={onPhoneChange} />
    </div>
    <div>
      <Button onClick={onButtonClick} text='add' />
    </div>
  </form>

export default PhonebookForm
