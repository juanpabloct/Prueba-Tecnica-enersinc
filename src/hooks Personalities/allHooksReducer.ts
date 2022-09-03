import { useSelector } from "react-redux";
import { InitialState, People } from "../types";
export const useAllPersons = () => {
  const { peoples } = useSelector((state: InitialState) => state);
  return peoples;
};
export const useViewPerson = (): People => {
  const { peopleView } = useSelector((state: InitialState) => state);
  return peopleView;
};
export const useLoading = () => {
  const { loading } = useSelector((state: InitialState) => state);
  return loading;
};
export const useError = () => {
  const { error } = useSelector((state: InitialState) => state);
  return error;
};
