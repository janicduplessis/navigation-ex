import * as React from 'react';
import { useNavigationBuilder, createNavigator } from '@navigation-ex/core';
import {
  TabRouter,
  TabRouterOptions,
  TabNavigationState,
} from '@navigation-ex/routers';
import MaterialTopTabView from '../views/MaterialTopTabView';
import {
  MaterialTopTabNavigationConfig,
  MaterialTopTabNavigationOptions,
} from '../types';

type Props = TabRouterOptions &
  MaterialTopTabNavigationConfig & {
    children: React.ReactNode;
  };

function MaterialTopTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    TabNavigationState,
    MaterialTopTabNavigationOptions,
    TabRouterOptions
  >(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
  });

  return (
    <MaterialTopTabView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export default createNavigator<
  MaterialTopTabNavigationOptions,
  typeof MaterialTopTabNavigator
>(MaterialTopTabNavigator);
