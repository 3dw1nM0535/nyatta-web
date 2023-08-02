import { Metadata } from 'next'

import LoginView from "views/login";

export const metadata: Metadata = {
  title: 'Login',
  description: "Get started"
}

const Page = () => <LoginView />;

// `/login/user`
export default Page;
