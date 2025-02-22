import { BoxCentered, Button } from '@fuel-ui/react';
import type { ComponentStoryFn, Meta } from '@storybook/react';

import { AccountService, MOCK_ACCOUNTS, useAccounts } from '../..';

import { EditAccount } from './EditAccount';

import { store } from '~/store';
import { Layout } from '~/systems/Core';

export default {
  component: EditAccount,
  title: 'Account/Pages/3. EditAccount',
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'chromeExtension',
    },
  },
} as Meta;

const Template: ComponentStoryFn<typeof EditAccount> = () => {
  const { isLoading, handlers } = useAccounts();
  return (
    <Layout isLoading={isLoading}>
      <BoxCentered css={{ minW: '100%', minH: '100%' }}>
        <Button
          onPress={() => handlers.goToEdit(MOCK_ACCOUNTS[0].address)}
          isLoading={isLoading}
        >
          Toggle Modal
        </Button>
      </BoxCentered>
    </Layout>
  );
};

export const Usage = Template.bind({});
Usage.loaders = [
  async () => {
    store.closeOverlay();
    await AccountService.clearAccounts();
    await AccountService.addAccount({ data: MOCK_ACCOUNTS[0] });
    return {};
  },
];
