const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}> {text}</button>

const PhonebookForm = ({ newName, onNameChange, newPhone, onPhoneChange, onButtonClick }) => 
  <form>
    <h2>add a new entry</h2>
    <div>
      <label>name:</label>
      <input value={newName} onChange={onNameChange} />
      <label>phone number:</label>
      <input value={newPhone} onChange={onPhoneChange} />
    </div>
    <div>
      <Button onClick={onButtonClick} text='add' />
    </div>
  </form>

export default PhonebookForm
