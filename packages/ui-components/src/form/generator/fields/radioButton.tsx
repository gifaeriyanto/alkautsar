import React from 'react'
import {
  useRadio,
  Box,
  UseRadioProps,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { FieldData } from '..'

export const RadioButton = (
  props: UseRadioProps & { children: React.ReactNode }
) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: 'orange.500',
          color: 'white',
          borderColor: 'orange.500',
        }}
        px={4}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const FormFieldRadioButton: React.FC<
  Omit<FieldData, 'type' | 'label'>
> = ({ name, rules, options, defaultValue }) => {
  const { register, setValue, watch } = useFormContext()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value: watch(name),
    onChange: (value) => {
      setValue(name, value)
    },
  })

  const group = getRootProps({ ...register(name, rules) })

  return (
    <HStack {...group}>
      {options?.map((item) => {
        const value = typeof item === 'string' ? item : item.value
        const label = typeof item === 'string' ? item : item.label
        const radio = getRadioProps({ value })
        return (
          <RadioButton key={value} {...radio}>
            {label}
          </RadioButton>
        )
      })}
    </HStack>
  )
}
