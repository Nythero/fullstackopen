import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props, refs) => {
  const { openText, closeText } = props

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  const showWhenVisible = { display: visible? '' : 'none' }
  const hideWhenVisible = { display: visible? 'none' : '' }

  return (
    <div>
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility}>
          {openText}
        </button>
      </div>
      <div style={showWhenVisible} >
        {props.children}
        <button onClick={toggleVisibility}>
          {closeText}
        </button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

export default Toggable
