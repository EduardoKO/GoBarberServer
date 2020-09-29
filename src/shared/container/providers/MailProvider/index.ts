import { container } from 'tsyringe';
import IMailProvider from './models/IMailProvider';
import mailConfig from '@config/mail';

import EtherialMailProvider from './implementations/EtherialMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherialMailProvider),
  ses: container.resolve(SESMailProvider)
};

container.registerInstance<IMailProvider>('MailProvider', providers[mailConfig.driver]);
