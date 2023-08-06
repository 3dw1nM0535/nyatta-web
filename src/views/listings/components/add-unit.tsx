import { useEffect } from 'react'

import { useMutation } from '@apollo/client'
import { Button, Select as ChakraSelect, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Modal, ModalContent, ModalBody, ModalHeader, ModalOverlay, Stack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select } from 'chakra-react-select'
import { Controller, useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import RenderBedrooms from './unit-bedroom'

import { ADD_PROPERTY_UNIT, GET_PROPERTY_UNITS } from '@gql'
import data from 'data/data.json'
import { UnitSchema } from 'form/validations'
import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'
import { Unit } from 'types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddUnit = ({ isOpen, onClose }: Props) => {
  const [addPropertyUnit, { loading: addingPropertyUnit }] = useMutation(ADD_PROPERTY_UNIT, {
    refetchQueries: [GET_PROPERTY_UNITS],
  })
  const { amenities } = data
  const toast = useToast()
  const { defaultListing } = useListings()
  const { control, register, watch, handleSubmit, formState: { errors } } = useForm<Unit>({
    resolver: yupResolver(UnitSchema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "bedrooms",
  });
  const type = watch("type")
  const onSubmit: SubmitHandler<Unit> = async data => {
    const input = {
      propertyId: defaultListing?.value,
      baths: data.baths,
      name: data.name,
      type: data.type,
      amenities: (data.amenities || []).map(amenity => ({
        name: amenity.label,
        category: amenity.category,
      })),
      bedrooms: (data.bedrooms || []).map(bedroom => ({
        ...bedroom,
        enSuite: bedroom.enSuite === 'yes' ? true : false,
        master: bedroom.master === 'yes' ? true : false,
      })),
      price: data.price.toString(),
    }
    if (!addingPropertyUnit) {
      await addPropertyUnit({
        variables: { input },
        onCompleted: () => {
          onClose()
          toast({
            title: "Congratulation!",
            description: "Property unit added successfully",
            status: "success",
            isClosable: true,
            duration: 3000,
            position: "top-right",
          })
        },
      })
    }
  }

  useEffect(() => {
    const totalBedrooms = Number(type);
    if (isNaN(totalBedrooms) && fields.length > 0) {
      for (let i = fields.length - 1; i >= 0; i--) {
        remove(i);
      }
    } else if (totalBedrooms > fields.length) {
      for (let i = fields.length; i < totalBedrooms; i++) {
        append({ bedroomNumber: i + 1, enSuite: "no", master: "no" });
      }
    } else if (totalBedrooms < fields.length) {
      for (let i = fields.length - 1; i >= totalBedrooms; i--) {
        remove(i);
      }
    }
  }, [type, append, remove, fields.length]);

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
              <RenderBedrooms fields={fields} register={register} type={type} />
              <Button isLoading={addingPropertyUnit} size="sm" type="submit">Add</Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddUnit
