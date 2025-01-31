import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { BiFilter } from 'react-icons/bi'
import { FormProvider, useForm } from 'react-hook-form'
import { FormGenerator, FormGeneratorProps } from '..'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterValues = Record<string, { operator: any; value: string }>

export interface Filter {
  formFilterPreset: FormGeneratorProps['data']
  ilikeFilterKeys?: string[]
  onSubmit?: (values: FilterValues) => void
}

export const Filter: React.FC<Filter> = ({
  formFilterPreset,
  ilikeFilterKeys,
  onSubmit: _onSubmit,
}) => {
  const formMethods = useForm()
  const { handleSubmit, reset } = formMethods
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = useCallback(
    (values: Record<string, string>) => {
      const mappedData = Object.entries(values).reduce<FilterValues>(
        (prev, [key, value]) => {
          if (!value) {
            return prev
          }
          const isIlike = ilikeFilterKeys && ilikeFilterKeys.includes(key)
          return {
            ...prev,
            [key]: {
              operator: isIlike ? 'ilike' : 'eq',
              value: isIlike ? `%${value}%` : value,
            },
          }
        },
        {}
      )
      _onSubmit?.(mappedData)
    },
    [_onSubmit, ilikeFilterKeys]
  )

  const handleReset = useCallback(() => {
    onSubmit({})
    reset()
    onClose()
  }, [onClose, onSubmit, reset])

  return (
    <>
      <IconButton
        icon={<BiFilter />}
        aria-label="Filter"
        variant="outline"
        colorScheme="gray"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit((values) => {
              onSubmit(values)
              onClose()
            })}
          >
            <ModalContent>
              <ModalHeader>Filter</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormGenerator data={formFilterPreset} />
              </ModalBody>

              <ModalFooter>
                <Button onClick={handleReset} variant="ghost" mr={4}>
                  Hapus Filter
                </Button>
                <Button type="submit">Terapkan</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}
