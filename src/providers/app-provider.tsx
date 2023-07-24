"use client";

import { ReactNode } from "react";

import { useQuery } from '@apollo/client';
import { useSession } from "next-auth/react";

import { GET_USER } from "@gql";
import Loader from 'components/loader'
import { AppContext } from 'contexts/app-context'

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const { data, loading: userLoading } = useQuery(GET_USER, {
    variables: { email: session?.user?.email },
    skip: status === 'unauthenticated' || status === 'loading',
  });

  if (status === "loading" || userLoading) <Loader />

  return (
    <AppContext.Provider
      value={{
        phone: data?.getUser?.phone,
        user: data?.getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
