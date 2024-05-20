
import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios"
import { all, call, put, takeEvery } from "redux-saga/effects"
import { getProducts } from "./Reducers/userSlice";
import Toast from "react-native-toast-message";

export function* watchgetProduct() {
    yield takeEvery('getProducts', getAllProducts);
}


export function* watchSearchProduct() {
    yield takeEvery('searchProduct', searchProduct);
}
export function* watchAddProduct() {
    yield takeEvery('addProduct', addProduct);
}

function* addProduct({ payload }: PayloadAction<{}>) {
    const res: AxiosResponse = yield call(axios.post, 'https://dummyjson.com/products/add', payload);
    if (res.status === 200) {
        yield Toast.show({ type: "success", text1: "Product Added Succesfully" })
    } else {
        yield Toast.show({ type: "error", text1: "Error Occured" })
    }
    yield console.log("done");
}

export type product = {
    category: string;
    description: string;
    id: number;
    thumbnail: string;
    price: number;
    rating: number;
    title: string;
    stock: number;
    brand: string;
    images: string[];
    discountPercentage: number
};

function* getAllProducts() {
    try {
        const res: AxiosResponse = yield call(axios.get, 'https://dummyjson.com/products?limit=0');
        yield put(getProducts(res.data.products));
    } catch (e) {
        console.log(e);
    }
}
function* searchProduct({ payload }: PayloadAction<string>) {
    try {
        console.log(payload);
        const res: AxiosResponse = yield call(axios.get, `https://dummyjson.com/products/search?q=${payload.toLowerCase().trim()}`)
        yield put(getProducts(res.data.products));
    } catch (e) {
        console.log(e)
    }
}

export default function* rootSaga() {
    yield all([
        watchgetProduct(),
        watchSearchProduct(),
        watchAddProduct()
    ])
}