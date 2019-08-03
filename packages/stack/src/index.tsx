import * as React from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-safe-area-view';
import {
  useNavigationBuilder,
  NavigationProp,
  ParamListBase,
  createNavigator,
} from '@navigation-ex/core';
import {
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
} from '@navigation-ex/routers';

type Props = StackRouterOptions & {
  children: React.ReactNode;
};

export type StackNavigationOptions = {
  /**
   * Title text for the screen.
   */
  title?: string;
};

export type StackNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  StackNavigationState,
  StackNavigationOptions
> & {
  /**
   * Push a new screen onto the stack.
   *
   * @param name Name of the route for the tab.
   * @param [params] Params object for the route.
   */
  push<RouteName extends keyof ParamList>(
    ...args: ParamList[RouteName] extends void
      ? [RouteName]
      : [RouteName, ParamList[RouteName]]
  ): void;

  /**
   * Pop a screen from the stack.
   */
  pop(count?: number): void;

  /**
   * Pop to the first route in the stack, dismissing all other screens.
   */
  popToTop(): void;
};

export function StackNavigator(props: Props) {
  const { state, descriptors } = useNavigationBuilder<
    StackNavigationState,
    StackNavigationOptions,
    StackRouterOptions
  >(StackRouter, props);

  return (
    <React.Fragment>
      {state.routes.map(route => (
        <View key={route.key} style={StyleSheet.absoluteFill}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>
                {descriptors[route.key].options.title}
              </Text>
            </View>
          </View>
          <View style={styles.content}>{descriptors[route.key].render()}</View>
        </View>
      ))}
    </React.Fragment>
  );
}

export default createNavigator<StackNavigationOptions, typeof StackNavigator>(
  StackNavigator
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2B98F0',
  },
  headerContent: {
    marginTop: getStatusBarHeight(false) || StatusBar.currentHeight,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    margin: 12,
  },
});
