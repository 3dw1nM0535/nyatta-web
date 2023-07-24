import { Metadata } from 'next'

import LoginView from "views/login";

export const metadata: Metadata = {
  title: 'Nyatta - Login to get started',
}

const Page = () => <LoginView />;

// `/login/user`
export default Page;
