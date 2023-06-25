"use client";

import { useMutation } from "@apollo/client";
import {
  Button,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

import { verifyVerificationCode as VERIFY_CODE, UPDATE_USER } from "@gql";
import { useSignIn } from "@hooks";
import { VerifySignInForm } from "@types";
import { VerifySignInSchema } from "form/validations";

const VerifySignInForm = (): JSX.Element => {
  const router = useRouter()
  const { data: session } = useSession();
  const [verifyCode, { loading: verifyingCode }] = useMutation(VERIFY_CODE);
  const [updateUser, { loading: creatingUser }] = useMutation(UPDATE_USER);
  const { setStatus, signInForm } = useSignIn();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<VerifySignInForm>({
    resolver: yupResolver(VerifySignInSchema),
  });

  const onSubmit: SubmitHandler<VerifySignInForm> = async (data) => {
    if (!verifyingCode) {
      await verifyCode({
        variables: {
          input: {
            phone: `${signInForm?.countryCode}${signInForm?.phone}`,
            countryCode: "KE",
            verifyCode: data.code,
          },
        },
        onCompleted: async (data) => {
          // TODO trigger error with invalid code
          if (data.verifyVerificationCode.success === "pending") {
            setStatus("pending");
          } else if (session?.onboarding === "true") {
            await updateUser({
              variables: {
                input: {
                  first_name: session?.user?.name?.split(" ")[0],
                  last_name: session?.user?.name?.split(" ")[1],
                  email: session?.user?.email,
                  avatar: session?.user?.image,
                  onboarding: false,
                  phone: `${signInForm?.countryCode}${signInForm?.phone}`,
                },
              },
              onCompleted: () => {
                router.push('/')
              },
            })
          }
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors?.code)}>
        <FormLabel>Verify Code</FormLabel>
        <HStack>
          <Input {...register("code")} type="number" />
          <Button isLoading={verifyingCode || creatingUser} type="submit">
            Sign In
          </Button>
        </HStack>
        {errors?.code != null && (
          <FormErrorMessage>{`${errors?.code.message}`}</FormErrorMessage>
        )}
        <FormHelperText>Enter 6-digit code sent to your phone</FormHelperText>
      </FormControl>
    </form>
  );
};

export default VerifySignInForm;
