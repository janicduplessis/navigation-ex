import {
  ParamListBase,
  NavigationProp,
  RouteProp,
} from '@react-navigation/core';
import { CompatNavigationProp } from './types';

export default function createCompatNavigationProp<
  ParamList extends ParamListBase,
  ScreenOptions extends {}
>(
  navigation: NavigationProp<ParamList>,
  route: RouteProp<ParamList, keyof ParamList>
): CompatNavigationProp<ParamList, ScreenOptions> {
  return {
    ...navigation,
    state: { ...route, routeName: route.name },
    getParam<T extends keyof ParamList>(
      paramName: T,
      defaultValue: ParamList[T]
    ): ParamList[T] {
      // @ts-ignore
      const params = route.params;

      if (params && paramName in params) {
        return params[paramName];
      }

      return defaultValue;
    },
  };
}
