import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Home from '../assets/Svgs/homeIcon.svg';
import User from '../assets/Svgs/users.svg';
import Drawer from '../assets/Svgs/drawer.svg';
import EyeOpen from '../assets/Svgs/eye_open.svg'
import EyeClose from '../assets/Svgs/eye_slashed.svg'
import Todo from '../assets/Svgs/todo.svg'
import Shopping from '../assets/Svgs/shopping.svg'
const iconStyle = (
  { width = 0,
    height = 0,
    color = 'black',
    borderColor = 'none', }
) => ({
  width: RFValue(width),
  height: RFValue(height),
  fill: color,
  stroke: borderColor,
});
type iconProps = { width: number, height: number, color?: string, borderColor?: string };

export const ICONS = {
  HOME: (params: iconProps) => Home({ ...iconStyle({ ...params }) }),
  USERS: (params: iconProps) => User({ ...iconStyle({ ...params }) }),
  DRAWER: (params: iconProps) => Drawer({ ...iconStyle({ ...params }) }),
  EyeOpen: (params: iconProps) => EyeOpen({ ...iconStyle({ ...params }) }),
  EyeClose: (params: iconProps) => EyeClose({ ...iconStyle({ ...params }) }),
  Todo: (params: iconProps) => Todo({ ...iconStyle({ ...params }) }),
  Shopping: (params: iconProps) => Shopping({ ...iconStyle({ ...params }) }),
};
