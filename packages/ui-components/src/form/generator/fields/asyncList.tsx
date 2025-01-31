import { Select } from '@chakra-ui/select'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getClient } from '@client/supabase'
import { FieldData } from '..'

const FormFieldAsyncList: React.FC<Omit<FieldData, 'type' | 'label'>> = ({
  name,
  rules,
  placeholder,
  tableName,
}) => {
  const { register } = useFormContext()
  const [list, setList] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    void (
      tableName &&
      getClient()
        .from(tableName)
        .select('id, name')
        .order('name')
        .then((res) => {
          if (res.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setList(res.data as any)
          }
        })
    )
  }, [tableName])

  return (
    <Select {...register(name, rules)} placeholder={placeholder}>
      {list.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  )
}

export default FormFieldAsyncList
