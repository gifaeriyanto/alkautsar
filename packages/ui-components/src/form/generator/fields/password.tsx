import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldData } from '..'

const PasswordInput: React.FC<Omit<FieldData, 'type'>> = ({
  name,
  rules,
  placeholder,
  componentProps,
}) => {
  const { register } = useFormContext()
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }

  return (
    <InputGroup size="md" {...componentProps}>
      <Input
        {...register(name, rules)}
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="gray">
          {show ? 'Sembunyikan' : 'Lihat'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
