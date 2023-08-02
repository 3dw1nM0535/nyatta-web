import { Metadata } from 'next'

import MailingView from 'views/mailing/mailing'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: "Sign up for updates on Nyatta"
}

const Page = () => <MailingView />;

export default Page
