import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useUser } from '@client/supabase'
import React, { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { FieldData, FieldOption } from '..'
import FormFieldAsyncList from './asyncList'
import PasswordInput from './password'
import FormFieldSelectUsersList from './selectUsers'
import { FormFieldTime } from './time'
import FormFieldUpload from './upload'
import FormMultipleFieldUpload from './multipleUpload'
import { FormFieldRadioButton } from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFieldArrayConditional = (name: string, control?: any) => {
  if (!control) {
    return { fields: [], append: () => undefined, remove: () => undefined }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fieldMethods = useFieldArray({
    control,
    name,
  })

  return fieldMethods
}

export const GeneralField: React.FC<FieldData> = (props) => {
  const {
    name,
    label,
    rules,
    info,
    hidden,
    disabled,
    defaultValue,
    componentProps,
    isArray,
  } = props
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext()
  const { data: userData } = useUser()

  const notEq = watch(hidden?.notEq?.fieldName || '')
  const currentValue = watch(name)

  const { fields, append, remove } = useFieldArrayConditional(
    name,
    isArray ? control : undefined
  )

  const renderField = useCallback(
    ({ type, ...rest }: FieldData) => {
      switch (type) {
        case 'select':
          return (
            <Select
              {...register(rest.name, rest.rules)}
              placeholder={rest.placeholder}
              {...componentProps}
            >
              {rest.options?.map((item: FieldOption) =>
                typeof item === 'string' ? (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ) : (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                )
              )}
            </Select>
          )

        case 'file':
          return (
            <Input
              {...register(rest.name, rest.rules)}
              placeholder={rest.placeholder}
              type={type}
              accept="image/jpg,image/jpeg,image/png"
              {...componentProps}
            />
          )

        case 'time':
          return <FormFieldTime {...rest} />

        case 'asyncList':
          return <FormFieldAsyncList {...rest} />

        case 'select_user':
          return <FormFieldSelectUsersList {...rest} />

        case 'select_multiple_users':
          return <FormFieldSelectUsersList allowMultiple {...rest} />

        case 'upload':
          return <FormFieldUpload {...rest} />

        case 'multiple-upload':
          return <FormMultipleFieldUpload {...rest} />

        case 'radio_button':
          return <FormFieldRadioButton {...rest} />

        case 'organization_id':
          return userData?.user_metadata.organization_id ? (
            <Input
              {...register(rest.name, {
                value:
                  userData.user_metadata.organization_id ||
                  '123e4567-e89b-12d3-a456-426614174000',
              })}
              {...componentProps}
              type="hidden"
            />
          ) : null

        case 'checkbox':
          return (
            <VStack align="flex-start">
              {rest.options?.map((item: FieldOption) =>
                typeof item === 'string' ? (
                  <Checkbox
                    {...register(rest.name)}
                    key={item}
                    value={item}
                    isChecked={(currentValue || [])?.includes(item)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(currentValue || []), item]
                        : (currentValue || []).filter((v: string) => v !== item)
                      setValue(name, newValue)
                    }}
                  >
                    {item}
                  </Checkbox>
                ) : (
                  <Checkbox
                    {...register(rest.name)}
                    key={item.value}
                    value={item.value}
                    isChecked={(currentValue || [])?.includes(item.value)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(currentValue || []), item.value]
                        : (currentValue || []).filter(
                            (v: string) => v !== item.value
                          )
                      setValue(name, newValue)
                    }}
                  >
                    {item.label}
                  </Checkbox>
                )
              )}
            </VStack>
          )

        case 'number':
          return (
            <Input
              {...register(rest.name, rest.rules)}
              placeholder={rest.placeholder}
              type={type}
              {...componentProps}
            />
          )

        case 'phone':
          return (
            <Input
              {...register(rest.name, {
                ...rest.rules,
                pattern: {
                  // eslint-disable-next-line prefer-named-capture-group
                  value: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
                  message: 'Nomor telepon tidak valid',
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any,
              })}
              placeholder={rest.placeholder || 'Masukkan nomor telepon'}
              type="tel"
              {...componentProps}
            />
          )

        case 'textarea':
          return (
            <Textarea
              {...register(rest.name, rest.rules)}
              placeholder={rest.placeholder}
              {...componentProps}
            />
          )

        case 'show-password':
          return <PasswordInput {...rest} />

        default:
          return (
            <>
              <Input
                {...register(rest.name, rest.rules)}
                placeholder={rest.placeholder}
                type={type}
                list={rest.options ? rest.name : undefined}
                {...componentProps}
              />
              <datalist id={rest.name}>
                {rest.options?.map((item, index) => (
                  <option
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    value={typeof item === 'string' ? item : item.value}
                  />
                ))}
              </datalist>
            </>
          )
      }
    },
    [
      componentProps,
      register,
      userData?.user_metadata.organization_id,
      currentValue,
      setValue,
      name,
    ]
  )

  if (
    hidden?.notEq &&
    Array.isArray(hidden.notEq.value) &&
    !hidden.notEq.value.includes(notEq)
  ) {
    return null
  }

  if (
    hidden?.notEq &&
    typeof hidden.notEq.value === 'string' &&
    notEq !== hidden.notEq.value
  ) {
    return null
  }

  return (
    <FormControl
      key={name}
      isInvalid={Boolean(errors[name])}
      isDisabled={disabled}
      defaultValue={defaultValue}
      defaultChecked={defaultValue}
    >
      {Boolean(label) && (
        <FormLabel>
          {label}
          {!rules?.required && (
            <Text ml={2} as="span" color="gray.500" fontSize="sm">
              (Opsional)
            </Text>
          )}
        </FormLabel>
      )}
      {Boolean(info) && (
        <Text mb="0.5rem" fontSize="sm" color="gray.500" mt="-0.5rem">
          {info}
        </Text>
      )}
      {isArray ? (
        <VStack align="flex-start">
          {fields.map((field, fieldIndex) => (
            <Box key={field.id} pos="relative" w="full">
              {renderField({ ...props, name: `${name}.${fieldIndex}.value` })}
              <IconButton
                icon={<BiTrash />}
                aria-label="Hapus field"
                pos="absolute"
                right={0}
                top={0}
                variant="outline"
                colorScheme="red"
                borderColor="red.100"
                hidden={fields.length <= 1}
                onClick={() => {
                  remove(fieldIndex)
                }}
              />
            </Box>
          ))}
        </VStack>
      ) : (
        renderField(props)
      )}
      {isArray ? (
        <Box>
          <Button
            leftIcon={<BiPlus />}
            variant="link"
            mt={4}
            size="sm"
            onClick={() => {
              append(undefined)
            }}
          >
            Tambah {label}
          </Button>
        </Box>
      ) : null}
      {errors[name] ? (
        <FormErrorMessage>{errors[name]?.message?.toString()}</FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
