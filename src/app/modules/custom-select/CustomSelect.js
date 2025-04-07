import React from 'react'
import Select from 'react-select'

const CustomSelect = (props) => {
  const handleMenuOpen = (event) => {
    event.stopPropagation()
    preventDefaults(event)
  }

  return (
    <Select
      {...props}
      onMouseDown={(event) => {
        handleMenuOpen(event)
        if (props.onMenuOpen) {
          props.onMenuOpen(event)
        }
      }}
    />
  )
}

export default CustomSelect
