/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Spinner,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { getCRUDBase, useList } from '@client/supabase'
import { PaginationParams } from '@client/supabase/CRUD-base/types'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { BiDotsVertical, BiNote, BiPlus, BiUser } from 'react-icons/bi'
import { Database } from '@client/supabase/types/database'
import {
  GeneralDatabaseTable,
  Pagination,
  capitalizeEachLetter,
  currency,
  dateFormat,
  number,
  timeFormat,
  transformImage,
} from '../..'

interface FieldData {
  type: 'avatar' | 'photo' | 'date' | 'time' | 'text' | 'currency'
  name: string
  capitalize?: boolean
  width?: BoxProps['w']
  bold?: boolean
  noImage?: boolean
  hideOnMobile?: boolean
  avatarIcon?: React.ReactElement
  render?: (data: any) => React.ReactNode
}

export interface CRUDTable<T extends GeneralDatabaseTable> {
  table: T
  view?: keyof Database['public']['Views']
  select?: string
  filters?: PaginationParams<T>['filters']
  fields: FieldData[]
  baseUrl: string
  moreActions?: (data: any) => React.ReactNode | null
  moreAddButtons?: React.ReactNode
  disableAdd?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  disableDetail?: boolean
  detailUrl?: ((data: any) => string) | string
  softDelete?: boolean
  sort?: PaginationParams<T>['sort']
  onDelete?: (data: any) => Promise<any>
  renderSearch?: React.ReactNode
  variant?: 'standard' | 'table'
}

export const CRUDTable = <T extends GeneralDatabaseTable>({
  table,
  view,
  select,
  filters,
  fields,
  baseUrl,
  moreActions,
  moreAddButtons,
  disableAdd,
  disableEdit,
  disableDelete,
  disableDetail,
  detailUrl,
  softDelete,
  sort,
  onDelete,
  renderSearch,
  variant,
}: CRUDTable<T>) => {
  const [isLargerThan1140] = useMediaQuery('(min-width: 1140px)')
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null)
  const {
    data,
    currentPage,
    totalPages,
    totalData,
    setPage,
    isLoading,
    refetch,
  } = useList((view as any) || table, { select, filters, sort })

  const { deleteById, softDeleteById } = getCRUDBase(table)

  const handleCloseDeleteModal = useCallback(() => {
    setItemIdToDelete(null)
  }, [])

  const handleDelete = useCallback(() => {
    if (typeof itemIdToDelete !== 'number') {
      return
    }
    if (onDelete) {
      void onDelete(data[itemIdToDelete] as any).then(() => {
        handleCloseDeleteModal()
        void refetch()
      })
      return
    }
    const deleteId = (data[itemIdToDelete] as any)?.id
    if (deleteId) {
      void (softDelete ? softDeleteById : deleteById)(deleteId).then(() => {
        handleCloseDeleteModal()
        void refetch()
      })
    }
  }, [
    data,
    deleteById,
    handleCloseDeleteModal,
    itemIdToDelete,
    onDelete,
    refetch,
    softDelete,
    softDeleteById,
  ])

  const getFieldValue = (path: string, object: any): any => {
    const keys = path.split('.')
    let result = object
    for (const key of keys) {
      result = result[key]
      if (result === undefined) {
        return undefined
      }
    }
    return result
  }

  const renderCustomItem = useCallback(
    (item: any, field: FieldData) => {
      if (!isLargerThan1140 && field.hideOnMobile) {
        return null
      }
      return field.render?.(item)
    },
    [isLargerThan1140]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderItem = (
    type: FieldData['type'],
    value: any,
    {
      capitalize,
      width,
      bold,
      noImage,
      hideOnMobile,
      avatarIcon,
    }: {
      capitalize?: boolean
      width?: BoxProps['w']
      bold?: boolean
      noImage?: boolean
      hideOnMobile?: boolean
      avatarIcon?: React.ReactElement
    }
  ) => {
    if (!isLargerThan1140 && hideOnMobile) {
      return null
    }

    switch (type) {
      case 'avatar':
        return (
          <Avatar
            src={noImage ? undefined : transformImage(value, 'avatar')}
            name={noImage ? value : undefined}
            mr={8}
            icon={avatarIcon || <BiUser />}
          />
        )

      case 'photo':
        return (
          <Image
            src={transformImage(value, 'photo')}
            alt="Photo"
            mr={8}
            borderRadius="md"
            boxSize={width || '50px'}
          />
        )

      case 'date':
        return (
          <Text
            display="inline-block"
            fontWeight={bold ? 'bold' : undefined}
            w={width}
          >
            {dateFormat(new Date(value))}
          </Text>
        )

      case 'time':
        return (
          <Text
            display="inline-block"
            fontWeight={bold ? 'bold' : undefined}
            w={width}
          >
            {timeFormat(new Date(value))}
          </Text>
        )

      case 'currency':
        return (
          <Text
            display="inline-block"
            fontWeight={bold ? 'bold' : undefined}
            w={width}
            isTruncated
          >
            {currency(value)}
          </Text>
        )

      case 'text':
        return (
          <Text
            display="inline-block"
            fontWeight={bold ? 'bold' : undefined}
            w={width}
            isTruncated
            title={capitalize ? capitalizeEachLetter(value) : value}
          >
            {(capitalize ? capitalizeEachLetter(value) : value) || '-'}
          </Text>
        )

      default:
        return null
    }
  }

  const getDetailUrl = (item: any) => {
    if (detailUrl) {
      if (typeof detailUrl === 'string') {
        return detailUrl
      }
      return detailUrl(item)
    }
    return `${baseUrl}/${item.id}`
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rowWrapper = (item: any, children: React.ReactNode) => {
    if (variant === 'table') {
      return <>{children}</>
    }
    if (disableDetail) {
      return <Box>{children}</Box>
    }
    return <Link href={getDetailUrl(item)}>{children}</Link>
  }

  const actions = useCallback<any>(
    (item: any, index: number) => {
      return (
        <>
          {moreActions?.(item)}
          {!disableEdit && (
            <MenuItem as={Link} href={`${baseUrl}/${item.id}/edit`}>
              Edit
            </MenuItem>
          )}
          {!disableDelete && (
            <MenuItem
              color="red.500"
              onClick={() => {
                setItemIdToDelete(index)
              }}
            >
              Hapus
            </MenuItem>
          )}
        </>
      )
    },
    [baseUrl, disableDelete, disableEdit, moreActions]
  )

  const renderEmptyState = useMemo(() => {
    if (!totalData && !isLoading) {
      return (
        <Card w="full">
          <CardBody textAlign="center" color="gray.500" py="2rem">
            <Icon
              as={BiNote}
              fontSize="x-large"
              verticalAlign="middle"
              mr={4}
            />
            Data tidak ditemukan
          </CardBody>
        </Card>
      )
    }

    return null
  }, [isLoading, totalData])

  const renderList = useMemo(() => {
    switch (variant) {
      case 'table':
        return (
          <>
            {renderEmptyState || (
              <TableContainer bgColor="white" borderRadius="10px">
                <Table variant="simple">
                  {data.map((item: any, index) => (
                    <Tr key={item?.id || index}>
                      {rowWrapper(
                        item,
                        <>
                          {React.Children.toArray(
                            fields.map((field) => (
                              <Td>
                                {field.render
                                  ? renderCustomItem(item, field)
                                  : renderItem(
                                      field.type,
                                      getFieldValue(field.name, item),
                                      {
                                        capitalize: field.capitalize,
                                        width: field.width,
                                        bold: field.bold,
                                        noImage: field.noImage,
                                        hideOnMobile: field.hideOnMobile,
                                        avatarIcon: field.avatarIcon,
                                      }
                                    )}
                              </Td>
                            ))
                          )}
                        </>
                      )}

                      {disableEdit &&
                      disableDelete &&
                      !moreActions?.(item) ? null : (
                        <Td w="70px">
                          <Menu>
                            <IconButton
                              as={MenuButton}
                              ml="auto"
                              variant="ghost"
                              icon={<BiDotsVertical />}
                              aria-label="action"
                              fontSize="lg"
                              textAlign="center"
                              sx={{
                                span: {
                                  display: 'flex',
                                  justifyContent: 'center',
                                },
                              }}
                            />
                            <Portal>
                              <MenuList>{actions(item, index)}</MenuList>
                            </Portal>
                          </Menu>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Table>
              </TableContainer>
            )}
          </>
        )

      default:
        return (
          <VStack spacing={4} w="full">
            {renderEmptyState ||
              data.map((item: any, index) => (
                <Flex
                  key={item.id}
                  bgColor="white"
                  w="full"
                  borderRadius="md"
                  p={4}
                  align="center"
                >
                  {rowWrapper(
                    item,
                    <Flex align="center">
                      {React.Children.toArray(
                        fields.map((field) =>
                          field.render
                            ? renderCustomItem(item, field)
                            : renderItem(
                                field.type,
                                getFieldValue(field.name, item),
                                {
                                  capitalize: field.capitalize,
                                  width: field.width,
                                  bold: field.bold,
                                  noImage: field.noImage,
                                  hideOnMobile: field.hideOnMobile,
                                  avatarIcon: field.avatarIcon,
                                }
                              )
                        )
                      )}
                    </Flex>
                  )}

                  {disableEdit &&
                  disableDelete &&
                  !moreActions?.(item) ? null : (
                    <Menu>
                      <IconButton
                        as={MenuButton}
                        ml="auto"
                        variant="ghost"
                        icon={<BiDotsVertical />}
                        aria-label="action"
                        fontSize="lg"
                        textAlign="center"
                        sx={{
                          span: {
                            display: 'flex',
                            justifyContent: 'center',
                          },
                        }}
                      />
                      <Portal>
                        <MenuList>{actions(item, index)}</MenuList>
                      </Portal>
                    </Menu>
                  )}
                </Flex>
              ))}
          </VStack>
        )
    }
  }, [
    actions,
    data,
    disableDelete,
    disableEdit,
    fields,
    moreActions,
    renderCustomItem,
    renderEmptyState,
    renderItem,
    rowWrapper,
    variant,
  ])

  return (
    <>
      <Flex mb={4} justify="space-between">
        <HStack spacing="1rem">
          <Box>
            <b>{number(totalData)}</b> data
          </Box>
          {isLoading ? (
            <HStack opacity="0.5">
              <Spinner size="sm" />
              {isLargerThan1140 ? <Text>Loading...</Text> : null}
            </HStack>
          ) : null}
        </HStack>

        {!disableAdd && (
          <HStack>
            {moreAddButtons}
            <Button
              leftIcon={<BiPlus />}
              variant="ghost"
              size="sm"
              as={Link}
              href={`${baseUrl}/create`}
            >
              Tambah
            </Button>
          </HStack>
        )}
      </Flex>
      <VStack spacing={4} align="normal">
        {renderSearch}
        {renderList}

        {totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={(value) => {
              setPage(value)
            }}
          />
        ) : null}
      </VStack>

      <Modal
        isOpen={typeof itemIdToDelete === 'number'}
        onClose={handleCloseDeleteModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Apakah Anda yakin ingin menghapus data{' '}
            <b>
              {typeof itemIdToDelete === 'number' &&
                (data[itemIdToDelete] as any)?.name}
            </b>
            ?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseDeleteModal}>
              Batal
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
