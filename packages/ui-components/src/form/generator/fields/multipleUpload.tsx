/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Image, useBoolean, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { IKContext, IKUpload } from 'imagekitio-react'
import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldData } from '..'

const getAuthenticator = async () => {
  const { data } = await axios.get('/api/imagekit/auth')
  return data
}

const FormMultipleFieldUpload: React.FC<Omit<FieldData, 'type' | 'label'>> = ({
  name,
  rules,
}) => {
  const { register, watch, setValue } = useFormContext()
  const [isLoading, { on, off }] = useBoolean()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value: string[] = watch(name) || []

  useEffect(() => {
    register(name, rules)
  }, [name, register, rules])

  const handleSuccess = useCallback(
    (response: any) => {
      setValue(name, [...value, response.url]) // Append new image URL
      off()
    },
    [name, off, setValue, value]
  )

  const handleRemove = (index: number) => {
    setValue(
      name,
      value.filter((_, i) => i !== index)
    ) // Remove selected image
  }

  return (
    <>
      <Button
        as="label"
        htmlFor={`upload-${name}`}
        variant="outline"
        colorScheme="gray"
        isLoading={isLoading}
      >
        Upload {value.length > 0 ? 'lebih banyak' : ''}
      </Button>

      {value.length > 0 && (
        <Stack spacing={2} mt="0.5rem">
          {value.map((src, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index} position="relative">
              <Image
                src={src}
                alt={`Uploaded Image ${index + 1}`}
                w="200px"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              />
              <Button
                size="xs"
                colorScheme="red"
                mt="0.2rem"
                onClick={() => {
                  handleRemove(index)
                }}
              >
                Hapus
              </Button>
            </Box>
          ))}
        </Stack>
      )}

      <IKContext
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
        authenticator={getAuthenticator}
      >
        <Box
          as={IKUpload}
          id={`upload-${name}`}
          useUniqueFileName
          onSuccess={handleSuccess}
          onUploadStart={on}
          onError={off}
          accept="image/*"
          validateFile={(file: any) => file.size < 10000000}
          hidden
        />
      </IKContext>
    </>
  )
}

export default FormMultipleFieldUpload
