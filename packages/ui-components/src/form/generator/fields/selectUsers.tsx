import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import { getClient } from '@client/supabase'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BiChevronDown, BiNote, BiSearch } from 'react-icons/bi'
import { useDebounce } from 'use-debounce'
import { FieldData } from '..'
import { capitalizeFirstLetter } from '../../../utilities/formatter'
import { transformImage } from '../../..'

interface User {
  id: string
  name: string
  avatar: string | null
  role?: string
}

const FormFieldSelectUsersList: React.FC<
  Omit<FieldData, 'type' | 'label'> & { allowMultiple?: boolean }
> = ({ name, allowMultiple, options }) => {
  const { setValue } = useFormContext()
  const [list, setList] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)
  const [selectedIDs, setSelectedIDs] = useState<User[]>([])
  const [isLoading, { on, off }] = useBoolean()

  useEffect(() => {
    if (allowMultiple) {
      setValue(name, selectedIDs)
    } else {
      setValue(name, selectedIDs[0]?.id)
    }
  }, [allowMultiple, name, selectedIDs, setValue])

  useEffect(() => {
    if (debouncedSearch.length < 3) {
      setList([])
      return
    }
    on()
    void getClient()
      .from('profiles')
      .select('id, name, avatar, role')
      .ilike('name', `%${debouncedSearch}%`)
      .order('name')
      .limit(10)
      .then((res) => {
        if (res.data) {
          setList(res.data)
        }
      })
      .then(off)
  }, [debouncedSearch, off, on])

  const handleRemove = (id: string) => {
    setSelectedIDs((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSelect = useCallback(
    (value: User) => {
      let role: string | undefined
      if (options?.[0]) {
        role = typeof options[0] === 'string' ? options[0] : options[0].value
      }
      const selectedUser: User = {
        ...value,
        role,
      }
      if (allowMultiple) {
        if (selectedIDs.find((item) => item.id === selectedUser.id)) {
          handleRemove(selectedUser.id)
        } else {
          setSelectedIDs((prev) => [...prev, selectedUser])
        }
      } else {
        setSelectedIDs([selectedUser])
      }
    },
    [allowMultiple, options, selectedIDs]
  )

  const handleUpdateRole = (id: string, role: string) => {
    setSelectedIDs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, role }
        }
        return item
      })
    )
  }

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <Center>
          <Spinner />
        </Center>
      )
    }

    if (search.length < 3) {
      return (
        <Center py="3rem">
          <Box color="gray.500" textAlign="center">
            <Icon as={BiSearch} fontSize="xx-large" />
            <Box>Masukkan kata kunci minimal 3 karakter</Box>
          </Box>
        </Center>
      )
    }

    if (search.length >= 3 && !list.length) {
      return (
        <Center py="3rem">
          <Box color="gray.500" textAlign="center">
            <Icon as={BiNote} fontSize="xx-large" />
            <Box>Data tidak ditemukan</Box>
          </Box>
        </Center>
      )
    }

    return (
      <>
        {list.map((item) => (
          <Box
            key={item.id}
            w="120px"
            role="button"
            onClick={() => {
              handleSelect(item)
            }}
          >
            <Avatar
              src={
                item.avatar ? transformImage(item.avatar, 'profile') : undefined
              }
              name={item.name}
              w="120px"
              h="120px"
              mb="1rem"
              border={
                selectedIDs.find((item2) => item2.id === item.id)
                  ? '5px solid'
                  : '0px solid'
              }
              borderColor="orange.500!important"
            />
            <Text
              textAlign="center"
              fontWeight="bold"
              isTruncated
              title={item.name}
            >
              {item.name}
            </Text>
          </Box>
        ))}
      </>
    )
  }, [handleSelect, isLoading, list, search.length, selectedIDs])

  return (
    <>
      <Input
        placeholder="Cari berdasarkan nama kader"
        value={search}
        onChange={(e) => {
          setSearch(e.currentTarget.value)
        }}
      />

      <HStack
        mt="1rem"
        mb="3rem"
        hidden={!selectedIDs.length}
        justify="center"
        flexWrap="wrap"
      >
        {selectedIDs.map((item) => (
          <Flex
            key={item.id}
            bgColor="orange.100"
            p="0.5rem"
            pl="1rem"
            borderRadius="lg"
            align="center"
            gap="1rem"
          >
            <Box>
              <Text fontWeight="bold">{item.name}</Text>
              <Text fontSize="sm" color="orange.500">
                {item.role ? capitalizeFirstLetter(item.role) : null}
              </Text>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BiChevronDown />}
                variant="link"
                fontSize="2xl"
              />
              <MenuList>
                {options?.map((option) =>
                  typeof option === 'string' ? (
                    <MenuItem
                      key={option}
                      onClick={() => {
                        handleUpdateRole(item.id, option)
                      }}
                    >
                      {option}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={option.value}
                      onClick={() => {
                        handleUpdateRole(item.id, option.value)
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  )
                )}
                <MenuItem
                  color="red.500"
                  onClick={() => {
                    handleRemove(item.id)
                  }}
                >
                  Hapus
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ))}
      </HStack>

      <HStack flexWrap="wrap" spacing="2rem" mt="2rem" justify="center">
        {renderContent}
      </HStack>
    </>
  )
}

export default FormFieldSelectUsersList
