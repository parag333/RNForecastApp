declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle;
  }

  export default class Icon extends Component<IconProps> {}
}

declare module 'react-native-linear-gradient' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface LinearGradientProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
    style?: ViewStyle | ViewStyle[];
    children?: React.ReactNode;
  }

  export default class LinearGradient extends Component<LinearGradientProps> {}
}
