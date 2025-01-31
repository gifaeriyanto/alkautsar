/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Flex, useBoolean } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getCRUDBase, getClient } from '@client/supabase'
import { toastService } from 'theme/client'
import { FieldData, FormGenerator } from '../generator'
import { GeneralDatabaseTable } from '.'

export interface ActionFormProps<T extends GeneralDatabaseTable> {
  formFields: FieldData[]
  redirectTo?: string
  table: T
  type: 'create' | 'edit' | 'custom'
  dataId?: string
  defaultValues?: Record<string, any>
  onSubmit?: (values: Record<string, any>) => Promise<any>
  onSuccess?: (data: any) => void
  mapperData?: (values: Record<string, any>) => any
  mapperDefaultValues?: (values?: Record<string, any>) => any
  variant?: 'no-wrapper' | 'normal'
  size?: 'small' | 'normal' | 'full'
}

export const ActionForm = <T extends GeneralDatabaseTable>({
  formFields,
  table,
  type,
  redirectTo,
  dataId,
  defaultValues: _defaultValues,
  onSubmit: _onSubmit,
  onSuccess,
  mapperData,
  mapperDefaultValues,
  variant,
  size = 'normal',
}: ActionFormProps<T>) => {
  const formMethods = useForm({
    defaultValues: _defaultValues,
  })
  const { handleSubmit } = formMethods
  const [loading, { on, off }] = useBoolean()
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<any>(null)

  const { createData, updateById } = getCRUDBase(table)

  useEffect(() => {
    if (type === 'edit' && dataId) {
      void getClient()
        .from(table)
        .select('*')
        .eq('id', dataId)
        .single()
        .then((res) => {
          if (res.error) {
            toastService.toast({
              title: 'Terjadi kesalahan',
              description: res.error.message,
              status: 'error',
            })
          }

          const newValues = {
            ...(res.data as Record<string, any>),
            ..._defaultValues,
          }
          setDefaultValues(
            mapperDefaultValues ? mapperDefaultValues(newValues) : newValues
          )
        })
    }

    return () => {
      setDefaultValues(null)
    }
  }, [_defaultValues, dataId, mapperDefaultValues, table, type])

  useEffect(() => {
    if (!defaultValues) {
      return
    }

    Object.entries(defaultValues)
      .filter(
        ([key]) =>
          ![
            'id',
            'created_at',
            'updated_at',
            'deleted_at',
            'province_id',
            'city_id',
            'district_id',
            'village_id',
          ].includes(key)
      )
      .forEach(([key, value]) => {
        formMethods.setValue(key, value)
      })
  }, [defaultValues, formMethods])

  const handleValues = useCallback(
    (values: any) => {
      if (mapperData) {
        return mapperData(values)
      }
      return values
    },
    [mapperData]
  )

  const action = useCallback(
    (values: any) => {
      switch (type) {
        case 'custom':
          return _onSubmit?.(handleValues(values))

        case 'create':
          return createData(handleValues(values))

        case 'edit':
          return dataId && updateById(dataId, handleValues(values))

        default:
      }
    },
    [_onSubmit, createData, dataId, handleValues, type, updateById]
  )

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        on()
        const parsedValues = { ...values }
        Object.entries(parsedValues).forEach(([key, value]) => {
          if (!value) {
            parsedValues[key] = null
          }
        })

        const res = await action(parsedValues)

        if (res?.error?.message) {
          toastService.toast({
            status: 'error',
            title: 'Terjadi kesalahan',
            description: res.error.message,
          })
        }

        if (res?.data) {
          toastService.toast({
            status: 'success',
            title: `Berhasil ${
              type === 'create' ? 'menambahkan' : 'mengubah'
            } data`,
          })
          onSuccess?.(res)
          if (!onSuccess) {
            redirectTo && router.push(redirectTo)
          }
        }
      } catch (error: any) {
        toastService.toast({
          status: 'error',
          title: 'Terjadi kesalahan',
          description: error.message,
        })
      } finally {
        off()
      }
    },
    [action, off, on, onSuccess, redirectTo, router, type]
  )

  const renderForm = useMemo(() => {
    let buttonText = 'Simpan'
    if (type === 'create') {
      buttonText = 'Tambah'
    }
    if (type === 'edit') {
      buttonText = 'Simpan Perubahan'
    }

    return (
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGenerator data={formFields} loading={loading} />

          <Flex justify="flex-end" mt="2rem">
            {redirectTo ? (
              <Button as={Link} colorScheme="gray" href={redirectTo} mr={4}>
                Batal
              </Button>
            ) : null}
            <Button type="submit" isLoading={loading}>
              {buttonText}
            </Button>
          </Flex>
        </form>
      </FormProvider>
    )
  }, [
    formFields,
    formMethods,
    handleSubmit,
    loading,
    onSubmit,
    redirectTo,
    type,
  ])

  const maxWidth = useMemo(() => {
    switch (size) {
      case 'small':
        return '400px'

      case 'normal':
        return '600px'

      case 'full':
        return 'full'

      default:
        return 'auto'
    }
  }, [size])

  const renderVariant = useMemo(() => {
    switch (variant) {
      case 'no-wrapper':
        return renderForm

      default:
        return (
          <Card p={8} maxW={maxWidth} m="auto">
            {renderForm}
          </Card>
        )
    }
  }, [maxWidth, renderForm, variant])

  return <>{renderVariant}</>
}
