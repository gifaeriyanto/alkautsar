/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Image, useBoolean } from '@chakra-ui/react'
import axios from 'axios'
import { IKContext, IKUpload } from 'imagekitio-react'
import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldData } from '..'

const getAuthenticator = async () => {
  const { data } = await axios.get('/api/imagekit/auth')
  return data
}

const FormFieldUpload: React.FC<Omit<FieldData, 'type' | 'label'>> = ({
  name,
  rules,
}) => {
  const { register, watch, setValue } = useFormContext()
  const [isLoading, { on, off }] = useBoolean()
  const value = watch(name)

  useEffect(() => {
    register(name, rules)
  }, [name, register, rules])

  const handleSuccess = useCallback(
    (value: any) => {
      setValue(name, value.url)
      off()
    },
    [name, off, setValue]
  )

  return (
    <>
      <Button
        as="label"
        htmlFor={`upload-${name}`}
        variant="outline"
        colorScheme="gray"
        isLoading={isLoading}
      >
        {value ? 'Upload ulang' : 'Upload'}
      </Button>
      {value ? (
        <Image
          src={value}
          alt="Image"
          w="200px"
          mt="0.5rem"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        />
      ) : null}
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

export default FormFieldUpload
