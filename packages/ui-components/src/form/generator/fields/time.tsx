import { Flex, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldData } from '..'

export const FormFieldTime: React.FC<Omit<FieldData, 'type' | 'label'>> = ({
  name,
  rules,
  timezoneKeyName,
}) => {
  const { register, setValue, watch } = useFormContext()
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')

  const currentValue = watch(name)
  const currentTimezone = timezoneKeyName ? watch(timezoneKeyName) : undefined

  useEffect(() => {
    if (currentValue) {
      const [_hour, _minute] = currentValue.split(':')
      _hour && setHour(_hour)
      _minute && setMinute(_minute)
    }
  }, [currentValue])

  useEffect(() => {
    setValue(name, `${hour}:${minute}:00`)
  }, [hour, minute, name, setValue])

  const formatNumber = (number: number) => (number < 10 ? '0' : '') + number

  return (
    <Flex align="center">
      <Input {...register(name, rules)} type="hidden" />
      <Select
        w="100px"
        value={hour}
        onChange={(e) => {
          setHour(e.currentTarget.value)
        }}
      >
        {[...Array(24).keys()].map((item) => (
          <option key={item}>{formatNumber(item)}</option>
        ))}
      </Select>
      <Text as="span" mx={4}>
        :
      </Text>
      <Select
        w="100px"
        value={minute}
        onChange={(e) => {
          setMinute(e.currentTarget.value)
        }}
      >
        {[...Array(60).keys()].map((item) => (
          <option key={item}>{formatNumber(item)}</option>
        ))}
      </Select>
      {timezoneKeyName ? (
        <>
          <Text as="span" mx={4}>
            -
          </Text>
          <Select
            w="100px"
            value={currentTimezone}
            onChange={(e) => {
              setValue(timezoneKeyName, e.currentTarget.value)
            }}
          >
            {['WIB', 'WITA', 'WIT'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </>
      ) : null}
    </Flex>
  )
}
