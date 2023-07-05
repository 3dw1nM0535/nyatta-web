'use client'

import { AbsoluteCenter, Button, Container, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'

import { MailingSchema } from 'form/validations'
import { MailingForm } from 'types'

const Mailing = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<MailingForm>({
    resolver: yupResolver(MailingSchema),
  })

  const onSubmit: SubmitHandler<MailingForm> = data => console.log(data)

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
          <FormHelperText>{`You'll be updated about new features`}</FormHelperText>
          <FormHelperText>{`We'll never share your email`}</FormHelperText>
        </FormControl>
        <Button mt={5} type="submit">Submit</Button>
      </Container>
    </AbsoluteCenter>
  </form>
)
}

export default Mailing
