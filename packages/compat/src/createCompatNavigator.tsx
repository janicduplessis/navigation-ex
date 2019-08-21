import * as React from 'react';
import {
  ParamListBase,
  TypedNavigator,
  NavigationProp,
  RouteProp,
} from '@react-navigation/core';
import CompatScreen from './CompatScreen';
import ScreenPropsContext from './ScreenPropsContext';
import createCompatNavigationProp from './createCompatNavigationProp';
import {
  ScreenType,
  RouteConfig,
  NavigationOptions,
  CompatNavigationProp,
} from './types';

export default function createCompatNavigator<
  ParamList extends ParamListBase,
  ScreenOptions extends {},
  NavigationConfig
>(
  createNavigator: () => TypedNavigator<
    ParamList,
    ScreenOptions,
    React.ComponentType<NavigationConfig>
  >,
  routeConfig: RouteConfig<ParamList, ScreenOptions>,
  navigationConfig: NavigationConfig & {
    defaultNavigationOptions?: ScreenOptions;
    navigationOptions?: {};
  }
) {
  const Pair = createNavigator();

  const {
    defaultNavigationOptions,
    navigationOptions: parentNavigationOptions,
    ...restConfig
  } = navigationConfig;

  function Navigator({ screenProps }: { screenProps: unknown }) {
    return (
      <ScreenPropsContext.Provider value={screenProps}>
        <Pair.Navigator
          {...(restConfig as NavigationConfig)}
          screenOptions={defaultNavigationOptions}
        >
          {Object.keys(routeConfig).map(name => {
            let ScreenComponent: ScreenType<ParamList, ScreenOptions>;

            let navigationOptions:
              | NavigationOptions<ParamList, ScreenOptions>
              | undefined;

            const routeConfigItem = routeConfig[name];

            if ('getScreen' in routeConfigItem) {
              ScreenComponent = routeConfigItem.getScreen();
              navigationOptions = routeConfigItem.navigationOptions;
            } else if ('screen' in routeConfigItem) {
              ScreenComponent = routeConfigItem.screen;
              navigationOptions = routeConfigItem.navigationOptions;
            } else {
              ScreenComponent = routeConfigItem;
              navigationOptions = ScreenComponent.navigationOptions;
            }

            const screenOptions:
              | ScreenOptions
              | ((options: { navigation: any; route: any }) => ScreenOptions)
              | undefined =
              typeof navigationOptions === 'function'
                ? ({
                    navigation,
                    route,
                  }: {
                    navigation: NavigationProp<ParamList>;
                    route: RouteProp<ParamList, keyof ParamList>;
                  }) =>
                    (navigationOptions as ((options: {
                      navigation: CompatNavigationProp<
                        ParamList,
                        ScreenOptions
                      >;
                    }) => ScreenOptions))({
                      navigation: createCompatNavigationProp<
                        ParamList,
                        ScreenOptions
                      >(navigation, route),
                    })
                : navigationOptions;

            return (
              <Pair.Screen key={name} name={name} options={screenOptions}>
                {({ navigation, route }) => (
                  <CompatScreen
                    navigation={navigation}
                    route={route}
                    component={ScreenComponent}
                  />
                )}
              </Pair.Screen>
            );
          })}
        </Pair.Navigator>
      </ScreenPropsContext.Provider>
    );
  }

  Navigator.navigationOtions = parentNavigationOptions;

  return Navigator;
}
