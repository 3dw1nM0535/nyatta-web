import { Metadata } from 'next'

import MailingView from 'views/mailing/mailing'

export const metadata: Metadata = {
  title: 'Nyatta - Sign Up for Updates',
}

const Page = () => <MailingView />;

export default Page
