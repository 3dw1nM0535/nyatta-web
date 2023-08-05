import { Button, Select as ChakraSelect, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Modal, ModalContent, ModalBody, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select } from 'chakra-react-select'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'

import data from 'data/data.json'
import { UnitSchema } from 'form/validations'
import { chakraStylesConfig } from 'styles'
import { Unit } from 'types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddUnit = ({ isOpen, onClose }: Props) => {
  const { amenities } = data
  const { control, register, handleSubmit, formState: { errors } } = useForm<Unit>({
    resolver: yupResolver(UnitSchema),
  })
  const onSubmit: SubmitHandler<Unit> = data => console.log(data)

  return (
    <Modal scrollBehavior="inside" motionPreset="slideInBottom" isCentered size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        backdropFilter="auto"
        bg="none"
        backdropInvert="35%"
        backdropBlur="2px"
      />
      <ModalContent>
        <ModalHeader>Add Unit</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel>Name</FormLabel>
                <Input size="sm" {...register("name")} />
                {errors.name != null && (
                  <FormErrorMessage>{`${errors.name.message}`}</FormErrorMessage>
                )}
                <FormHelperText>Unit name</FormHelperText>
              </FormControl>
              <Controller
                name="amenities"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Amenities</FormLabel>
                    <Select
                      {...field}
                      size="sm"
                      placeholder="Amenities"
                      options={amenities}
                      isSearchable
                      isClearable
                      isMulti
                      closeMenuOnSelect={false}
                      chakraStyles={chakraStylesConfig}
                    />
                  </FormControl>
                )}
              />
              <FormControl isInvalid={Boolean(errors.baths)}>
                <FormLabel>Bathrooms</FormLabel>
                <Input
                  size="sm"
                  type="number"
                  {...register("baths", {
                    setValueAs: (v) => Number(v),
                  })}
                />
                {errors.baths != null && (
                  <FormErrorMessage>{`${errors.baths.message}`}</FormErrorMessage>
                )}
                <FormHelperText>Number of bathrooms</FormHelperText>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.price)}>
                <FormLabel>Rent</FormLabel>
                <Input
                  size="sm"
                  type="number"
                  {...register("price", {
                    setValueAs: (v) => Number(v),
                  })}
                />
                {errors.price != null && (
                  <FormErrorMessage>{`${errors.price.message}`}</FormErrorMessage>
                )}
                <FormHelperText>Monthly rent price</FormHelperText>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.type)}>
                <FormLabel>Unit Type</FormLabel>
                <ChakraSelect
                  size="sm"
                  {...register("type")}
                  placeholder="Unit type"
                >
                 <option value="single room">Single room</option>
                 <option value="studio">Studio</option>
                 <option value="1">1 bedroom</option>
                 <option value="2">2 bedroom</option>
                 <option value="3">3 bedroom</option>
                </ChakraSelect>
              </FormControl>
              <Button size="sm" type="submit">Add</Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddUnit