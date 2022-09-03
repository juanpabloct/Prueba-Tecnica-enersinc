import { Alert, Button, Pagination, Space, Table, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { DataTypeColumns } from "../types";
import {
  useAllPersons,
  useError,
  useLoading,
} from "../hooks Personalities/allHooksReducer";
import { useEffect, useState } from "react";

import { Loading } from "./loading/loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../connect";
import { setLoading } from "../reducers/reducerPeople";
export const TablePersons = () => {
  const [page, setPage] = useState(1);
  const Persons = useAllPersons();
  const error = useError();
  const loading = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;
  useEffect(() => {
    dispatch(setLoading());
    setTimeout(() => getUsers(dispatch, page), 700);
    return;
  }, [dispatch, page]);
  const columns: ColumnsType<DataTypeColumns> = [
    {
      title: "Person",
      dataIndex: "person",
      key: "person",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, crud) => (
        <Space size={"small"}>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/view/${crud.key}`);
            }}
          >
            View
          </Button>
          <Button
            color="yellow"
            onClick={() => {
              navigate(`editUser/${crud.key}`);
            }}
          >
            Edit
          </Button>
          <Button
            type="dashed"
            danger
            onClick={() => {
              dispatch(setLoading());
              setTimeout(() => {
                deleteUser(dispatch, +crud.key);
              }, 500);
            }}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const datos: DataTypeColumns[] = Persons.map((persona, index) => ({
    person: persona.name,
    key: "" + persona.id,
    actions: [],
  }));

  return (
    <>
      {error.message !== "" && (
        <Alert
          message={error.message}
          type={error.error ? "error" : "success"}
        />
      )}
      <Title level={2}>All Persons</Title>
      <Title level={5}>Page:{page}</Title>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => {
              navigate("/addPerson/");
            }}
          >
            Add Person
          </Button>
          <Space size={"middle"}>
            <Table
              columns={columns}
              dataSource={datos}
              bordered
              pagination={false}
            />
          </Space>
          <Pagination
            defaultCurrent={page}
            total={100}
            onChange={(e) => setPage(e)}
          />
        </>
      )}
    </>
  );
};
