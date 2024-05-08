import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const NAVIGATION: { LOGIN: 'Login', SIGNUP: 'Signup', APP: 'App', TABS: { DRAWER: { HOME: 'Home', SETTINGS: 'Settings' }, USERS: "Users" } } = { LOGIN: 'Login', SIGNUP: 'Signup', APP: 'App', TABS: { DRAWER: { HOME: 'Home', SETTINGS: 'Settings' }, USERS: "Users" } }
export type RootStackParamList = {
    Signup: undefined;
    Login: undefined;
    App: undefined;
    UserDetails: undefined
    changePass: undefined
    Billing:undefined
};
export type BottomTabParamList = {
    Drawer: undefined;
    Users: undefined;
    Todo:undefined;
};
export type DrawerParamList = {
    Home: undefined
    Settings: undefined
}
export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Drawer'>,
    DrawerScreenProps<DrawerParamList, 'Home'>>

export type UserTabScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Users'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;