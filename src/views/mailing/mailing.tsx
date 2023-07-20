'use client'

import React from 'react'

import { useMutation } from '@apollo/client'
import { AbsoluteCenter, Button, Container, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'

import { SAVE_MAIL } from '@gql'
import { MailingSchema } from 'form/validations'
import { MailingForm } from 'types'

const MailingView: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<MailingForm>({
    resolver: yupResolver(MailingSchema),
  })
  const [saveMail, { loading: savingMail }] = useMutation(SAVE_MAIL)
  const toast = useToast()

  const onSubmit: SubmitHandler<MailingForm> = async data => {
    if (!savingMail) {
      await saveMail({
        variables: {
          email: data.email,
        },
        onCompleted: data => {
          if (data.saveMailing.success === "okay") {
            toast({
              title: "Email saved!",
              description: "We'll let you know about new releases.",
              status: "success",
              isClosable: true,
              duration: 3000,
              position: 'top-right',
            })
          }
        },
      })
    }
  }

  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <AbsoluteCenter w="100%">
      <Container maxW="max-content">
        <FormControl isInvalid={Boolean(errors?.email)}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email")}
          />
          {((errors?.email) != null) && (
            <FormErrorMessage>
              {errors?.email?.message}
            </FormErrorMessage>
          )}
          <FormHelperText>{`Get updates about new features.`}</FormHelperText>
        </FormControl>
        <Button isLoading={savingMail} mt={5} type="submit">Submit</Button>
      </Container>
    </AbsoluteCenter>
  </form>
)
}

export default MailingView
