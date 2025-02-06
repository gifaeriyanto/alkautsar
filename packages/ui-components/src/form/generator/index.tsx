/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse, Icon, VStack, useDisclosure } from '@chakra-ui/react'
import React, { Fragment, useMemo } from 'react'
import { RegisterOptions } from 'react-hook-form'
import { Database } from '@client/supabase/types/database'
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'
import { GeneralField } from '..'

export type FieldType =
  | 'hidden'
  | 'checkbox'
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'show-password'
  | 'select'
  | 'date'
  | 'file'
  | 'province'
  | 'city'
  | 'district'
  | 'village'
  | 'office'
  | 'time'
  | 'campus_name'
  | 'campus_major'
  | 'campus_batch'
  | 'asyncList'
  | 'organization_id'
  | 'select_user'
  | 'select_multiple_users'
  | 'quran'
  | 'upload'
  | 'multiple-upload'
  | 'collapse'
  | 'radio_button'

export type FieldOption = string | { label: string; value: any }

export type Timezone = 'WIB' | 'WITA' | 'WIT'

export interface FieldData {
  name: string
  label?: string
  placeholder?: string
  info?: string
  type: FieldType
  rules?: RegisterOptions
  options?: FieldOption[]
  hidden?: {
    notEq?: {
      fieldName: string
      value: string | string[]
    }
  }
  onUpload?: (value: string) => Promise<any>
  disabled?: boolean
  defaultValue?: any
  // for list fetch field
  tableName?: keyof Database['public']['Tables']
  componentProps?: Record<string, any>
  subFields?: FieldData[]
  timezoneKeyName?: string
  isArray?: boolean
}

export interface FormGeneratorProps {
  data: FieldData[]
  loading?: boolean
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({
  data,
  loading,
}) => {
  const { isOpen, onToggle } = useDisclosure()
  const [hiddenFields, shownFields] = useMemo(() => {
    return data.reduce<[typeof data, typeof data]>(
      (prev, curr) => {
        if (curr.type === 'hidden') {
          prev[0].push(curr)
        } else {
          prev[1].push(curr)
        }
        return prev
      },
      [[], []]
    )
  }, [data])

  return (
    <>
      {hiddenFields.map((item) => (
        <GeneralField key={item.name} disabled={loading} {...item} />
      ))}
      <VStack spacing="1rem" w="full" align="flex-start">
        {shownFields.map((item) => {
          if (item.subFields) {
            return (
              <Fragment key={item.name}>
                <Button onClick={onToggle} variant="link" mt="1rem" mb="0.5rem">
                  {item.label}
                  <Icon ml={2} as={isOpen ? BiCaretUp : BiCaretDown} />
                </Button>
                <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
                  <VStack
                    spacing="1rem"
                    w="full"
                    borderTop="1px solid"
                    borderColor="gray.200"
                    pt="1rem"
                  >
                    {item.subFields.map((subField) => (
                      <GeneralField
                        key={subField.name}
                        disabled={loading}
                        {...subField}
                      />
                    ))}
                  </VStack>
                </Collapse>
              </Fragment>
            )
          }
          return <GeneralField key={item.name} disabled={loading} {...item} />
        })}
      </VStack>
    </>
  )
}
