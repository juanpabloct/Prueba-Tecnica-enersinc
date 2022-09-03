import { AnyAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { Dispatch } from "react";
import { instance } from "../connection";
import {
  setError,
  setLoading,
  setPeoples,
  setPeopleView,
} from "../reducers/reducerPeople";
import { People } from "../types";

export const getUsers = async (
  dispatch: Dispatch<AnyAction>,
  page: number = 1
) => {
  instance
    .get(`/users?page=${page}`)
    .then((result) => {
      dispatch(setPeoples(result.data));
      dispatch(setError({ error: false, message: "" }));
    })
    .catch((error) => {
      dispatch(setError({ error: true, message: "Error Al pedir datos" }));
    });
};
export const getUser = async (dispatch: Dispatch<AnyAction>, id: number) => {
  instance
    .get(`/users/${id}`)
    .then((result) => {
      dispatch(setPeopleView(result.data));
    })
    .catch((error) => {
      dispatch(
        setError({
          error: true,
          message: "Error the get data, user  is not  existing",
        })
      );
    });
};
export const deleteUser = async (dispatch: Dispatch<AnyAction>, id: number) => {
  instance
    .delete(`/users/${id}`)
    .then((result) => {
      getUsers(dispatch);
      dispatch(
        setError({ error: false, message: "Data deleted successfully" })
      );
    })
    .catch((error) => {
      dispatch(setError({ error: true, message: "Failed to delete data" }));
    });
};
export const editUser = (
  { name, email, status, gender }: People,
  id: number,
  dispatch: Dispatch<AnyAction>
) => {
  instance
    .put(`users/${id}`, {
      name: name,
      email,
      status,
      gender,
    })
    .then((res) => {
      dispatch(setPeopleView(res.data));
      dispatch(setError({ error: false, message: "Data updated correctly" }));
      dispatch(setLoading());
    })
    .catch((error) => {
      dispatch(setLoading());
      dispatch(setError({ error: false, message: "Error updating data" }));
    });
};

export const addUser = (data: People, dispatch: Dispatch<AnyAction>) => {
  instance
    .post("users/", { ...data })
    .then(() =>
      dispatch(setError({ error: false, message: "Data added successfully" }))
    )
    .catch(() => {
      dispatch(setError({ error: true, message: "Failed to add Person" }));
    });
};
