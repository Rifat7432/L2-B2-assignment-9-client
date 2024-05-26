import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { strict } from "assert";

export type TErrorData = {
  data: {
    success: boolean;
    message: string;
    errorDetails: any;
    stack: null;
  };
};
export type TResponse<T> = {
  data: {
    data?: T;
    success: boolean;
    message: string;
  };
  error?: TErrorData;
};
export type TUserLoginData = {
  accessToken: string;
  refreshToken: string;
};

export type TUser = {
  userId: string;
  email: string;
  role: string;
  photo: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TPet = {
  id: string;
  name: string;
  photos: string[];
  species: string;
  breed: string;
  gender: string;
  age: number;
  size: string;
  location: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
};
