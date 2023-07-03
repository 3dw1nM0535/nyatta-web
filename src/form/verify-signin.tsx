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
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

import { verifyUserVerificationCode as VERIFY_USER_CODE, ONBOARD_USER } from "@gql";
import { useSignIn } from "@hooks";
import { Session, VerifySignInForm } from "@types";
import { VerifySignInSchema } from "form/validations";

const VerifySignInForm = (): JSX.Element => {
  const { data: session, update } = useSession();
  const [verifyCode, { loading: verifyingCode }] = useMutation(VERIFY_USER_CODE);
  const [onboardUser, { loading: creatingUser }] = useMutation(ONBOARD_USER);
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
            email: session?.user?.email,
            countryCode: "KE",
            verifyCode: data.code,
          },
        },
        onCompleted: async (data) => {
          // TODO trigger error with invalid code
          if (data.verifyUserVerificationCode.success === "pending") {
            setStatus("pending");
          } else if (((session as unknown) as Session)?.onboarding === "true") {
            await onboardUser({
              variables: {
                input: {
                  email: session?.user?.email,
                  onboarding: false,
                },
              },
              onCompleted: () => {
                // update session
                update()
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
