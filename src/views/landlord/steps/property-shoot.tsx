import { useMutation } from "@apollo/client";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Image,
  Input,
  Icon,
  Spacer,
  SimpleGrid,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

import { uploadImage as UPLOAD_IMAGE, SETUP_PROPERTY } from "@gql";
import { usePropertyOnboarding } from "@hooks";
import { type ContactPersonForm } from "@types";
import { ContactPersonSchema } from "form/validations";

const Shoot = (): JSX.Element => {
  const [uploadImage, { loading: uploadingImage }] = useMutation(UPLOAD_IMAGE);
  const [setupProperty, { loading: settingupProperty }] = useMutation(SETUP_PROPERTY)
  const { setStep, descriptionForm, locationForm, propertyType, unitsForm, caretakerForm, contactPersonForm, setContactPersonForm } =
    usePropertyOnboarding();
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<ContactPersonForm>({
    defaultValues: contactPersonForm,
    resolver: yupResolver(ContactPersonSchema),
  });

  const handleDrop = async (acceptedFiles: File[]) => {
    await uploadImage({
      variables: {
        file: acceptedFiles[0],
      },
      onCompleted: (data) => {
        setValue("contactPerson", data.uploadImage);
        trigger("contactPerson");
      },
    });
  };

  const personImg = watch("contactPerson");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
    disabled: uploadingImage,
    multiple: false,
    onDrop: handleDrop,
  });

  const goBack = () => setStep("units");
  const onSubmit: SubmitHandler<ContactPersonForm> = async (data) => {
    setContactPersonForm(data);
    const input = {
          name: descriptionForm.name,
          town: locationForm?.town?.label,
          postalCode: locationForm.postalCode,
          propertyType: propertyType.propertyType,
          caretaker: {
            first_name: caretakerForm.firstName,
            last_name: caretakerForm.lastName,
            idVefification: caretakerForm.idVerification,
            countryCode: "KE",
            phone: `${caretakerForm.countryCode}${caretakerForm.phoneNumber}`,
          },
          units: unitsForm.units.reduce((acc, unit) => {
              const amenities = unit.amenities.map(amenity => ({
                name: amenity.label,
                category: amenity.category,
              }))
              const runningObj = {
                name: unit.name,
                type: unit.type,
                baths: unit.baths,
                price: String(unit.price),
                bedrooms: unit.bedrooms.map(item => ({
                  ...item,
                  enSuite: item.enSuite === 'yes' ? true : false,
                  master: item.master === 'yes' ? true : false,
                })),
                amenities: amenities,
              }
              return acc.concat(runningObj as any)
            }, []),
            shoot: {
              date: new Date(data.shootDate).toISOString(),
            },
        }
        await setupProperty({
          variables: {
            input,
          },
          onCompleted: data => console.log(data),
        })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
        <Box>
          <FormControl isInvalid={Boolean(errors?.contactPerson)}>
            <FormLabel>Contact person</FormLabel>
            <Textarea
              as={Center}
              {...getRootProps({ className: "dropzone" })}
              borderRadius="md"
              border="2px dashed"
              minH={{ base: "80", md: "100px" }}
              borderColor="chakra-border-color"
              h="auto"
              spacing={4}
              p={4}
              justify={personImg ? "start" : "center"}
              cursor="pointer"
            >
              {personImg && !uploadingImage && (
                <Image
                  src={personImg}
                  loading="eager"
                  maxW={{
                    base: "100px",
                    md: "200px",
                  }}
                  alt="Contact Person"
                />
              )}
              {!personImg && !uploadingImage && <Icon as={FaUpload} />}
              {uploadingImage && <Spinner size="lg" />}
            </Textarea>
            <input
              {...register("contactPerson", {
                required: { value: true, message: "Required" },
              })}
              {...getInputProps()}
            />
            {errors.contactPerson != null && (
              <FormErrorMessage>
                {errors?.contactPerson.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              defaultValue={`${caretakerForm.firstName} ${caretakerForm.lastName}`}
              disabled={true}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              disabled={true}
              defaultValue={`${caretakerForm.countryCode}${caretakerForm.phoneNumber}`}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isInvalid={Boolean(errors?.shootDate)}>
            <FormLabel>Schedule shoot date</FormLabel>
            <Input type="date" {...register("shootDate")} />
            {errors.shootDate != null && (
              <FormErrorMessage>{errors?.shootDate.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      </SimpleGrid>
      <HStack mt={{ base: 4, md: 6 }}>
        <Button
          colorScheme="green"
          onClick={goBack}
          leftIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
        <Spacer />
        <Button
          colorScheme="green"
          isLoading={settingupProperty}
          type="submit"
          rightIcon={<ArrowForwardIcon />}
        >
          Finish
        </Button>
      </HStack>
    </form>
  );
};

export default Shoot;
