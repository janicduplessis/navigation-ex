import * as React from 'react';
import { createNavigator, useNavigationBuilder } from '@navigation-ex/core';
import {
  DrawerNavigationState,
  DrawerRouterOptions,
  DrawerRouter,
} from '@navigation-ex/routers';

import DrawerView from '../views/DrawerView';
import { DrawerNavigationOptions, DrawerNavigationConfig } from '../types';

type Props = DrawerRouterOptions &
  Partial<DrawerNavigationConfig> & {
    children: React.ReactNode;
  };

function DrawerNavigator({ initialRouteName, children, ...rest }: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    DrawerNavigationState,
    DrawerNavigationOptions,
    DrawerRouterOptions
  >(DrawerRouter, {
    initialRouteName,
    children,
  });

  return (
    <DrawerView
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      {...rest}
    />
  );
}

export default createNavigator<DrawerNavigationOptions, typeof DrawerNavigator>(
  DrawerNavigator
);
