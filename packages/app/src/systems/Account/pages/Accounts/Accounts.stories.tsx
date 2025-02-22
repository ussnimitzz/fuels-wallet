import { BoxCentered, Button } from '@fuel-ui/react';
import type { ComponentStoryFn, Meta } from '@storybook/react';

import { AccountService, MOCK_ACCOUNTS, useAccounts } from '../..';

import { Accounts } from './Accounts';

import { store } from '~/store';
import { Layout } from '~/systems/Core';

export default {
  component: Accounts,
  title: 'Account/Pages/Accounts',
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'chromeExtension',
    },
  },
} as Meta;

const Template: ComponentStoryFn<typeof Accounts> = () => {
  const { isLoading, handlers } = useAccounts();
  return (
    <Layout isLoading={isLoading}>
      <BoxCentered css={{ minW: '100%', minH: '100%' }}>
        <Button onPress={handlers.goToList} isLoading={isLoading}>
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
    await AccountService.addAccount({ data: MOCK_ACCOUNTS[1] });
    await AccountService.addAccount({ data: MOCK_ACCOUNTS[2] });
    return {};
  },
];
