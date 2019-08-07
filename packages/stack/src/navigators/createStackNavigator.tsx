import * as React from 'react';
import { useNavigationBuilder, createNavigator } from '@navigation-ex/core';
import {
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
} from '@navigation-ex/routers';
import KeyboardManager from '../views/KeyboardManager';
import StackView from '../views/Stack/StackView';
import { StackNavigationConfig, StackNavigationOptions } from '../types';

type Props = StackRouterOptions &
  StackNavigationConfig & {
    keyboardHandlingEnabled?: boolean;
    children: React.ReactNode;
  };

function StackNavigator({
  keyboardHandlingEnabled,
  initialRouteName,
  children,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    StackNavigationState,
    StackNavigationOptions,
    StackRouterOptions
  >(StackRouter, {
    initialRouteName,
    children,
  });

  return (
    <KeyboardManager enabled={keyboardHandlingEnabled !== false}>
      {props => (
        <StackView
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          {...rest}
          {...props}
        />
      )}
    </KeyboardManager>
  );
}

export default createNavigator<StackNavigationOptions, typeof StackNavigator>(
  StackNavigator
);
