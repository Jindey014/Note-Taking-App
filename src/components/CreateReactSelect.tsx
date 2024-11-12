import React, { useState } from 'react'

import CreatableSelect from 'react-select/creatable'

interface Option {
  readonly label: string
  readonly value: string
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})

const defaultOptions = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
]

const CreateReactSelect = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState<Option | null>()

  const handleCreate = (inputValue: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const newOption = createOption(inputValue)
      setIsLoading(false)
      setOptions((prev) => [...prev, newOption])
      setValue(newOption)
    }, 1000)
  }

  return (
    <CreatableSelect
      isClearable
      isMulti
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#E5E7EB',
          boxShadow: 'none',
          '&:hover': { borderColor: '#3B82F6' },
          cursor: 'pointer',
        }),
        option: (base, { isFocused }) => ({
          ...base,
          backgroundColor: isFocused ? '#E5E7EB' : 'white',
          color: '#374151',
        }),
        menu: (base) => ({
          ...base,
          zIndex: 50,
        }),
      }}
    />
  )
}

export default CreateReactSelect
