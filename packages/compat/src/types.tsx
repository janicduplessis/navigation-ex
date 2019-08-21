import {
  ParamListBase,
  NavigationProp,
  NavigationState,
  Route,
} from '@react-navigation/core';

export type CompatNavigationProp<
  ParamList extends ParamListBase,
  ScreenOptions extends {}
> = NavigationProp<ParamList, string, NavigationState, ScreenOptions> & {
  state: Route<Extract<keyof ParamList, string>> & {
    routeName: Extract<keyof ParamList, string>;
  };
  getParam<T extends keyof ParamList>(
    paramName: T,
    defaultValue: ParamList[T]
  ): ParamList[T];
};

export type NavigationOptions<
  ParamList extends ParamListBase,
  ScreenOptions extends {}
> =
  | ((options: {
      navigation: CompatNavigationProp<ParamList, ScreenOptions>;
    }) => ScreenOptions)
  | ScreenOptions;

export type ScreenType<
  ParamList extends ParamListBase,
  ScreenOptions extends {}
> = React.ComponentType<any> & {
  navigationOptions?: NavigationOptions<ParamList, ScreenOptions>;
};

export type RouteConfig<
  ParamList extends ParamListBase,
  ScreenOptions extends {}
> = {
  [key: string]:
    | ScreenType<ParamList, ScreenOptions>
    | ((
        | { screen: ScreenType<ParamList, ScreenOptions> }
        | { getScreen(): ScreenType<ParamList, ScreenOptions> }
      ) & {
        navigationOptions?: NavigationOptions<ParamList, ScreenOptions>;
      });
};
