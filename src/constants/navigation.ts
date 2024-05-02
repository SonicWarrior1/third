import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const NAVIGATION: { LOGIN: 'Login', SIGNUP: 'Signup', APP: 'App', TABS: { HOME: 'Home', USERS: "Users" } } = { LOGIN: 'Login', SIGNUP: 'Signup', APP: 'App', TABS: { HOME: 'Home', USERS: "Users" } }
export type RootStackParamList = {
    Signup: undefined;
    Login: undefined;
    App: undefined;
    UserDetails: undefined
};
export type BottomTabParamList = {
    Home: undefined;
    Users: undefined;
};
export type HomeTabScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>

export type UserTabScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Users'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;