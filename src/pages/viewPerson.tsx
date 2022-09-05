import { Alert, Button, Row, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../connect";
import { Typography } from "antd";

import {
  useError,
  useLoading,
  useViewPerson,
} from "../hooks Personalities/allHooksReducer";
import { setLoading } from "../reducers/reducerPeople";
import { Loading } from "../components/loading/loading";
export const ViewPerson = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useLoading();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLoading());
    const time = setTimeout(() => {
      id && getUser(dispatch, +id);
    }, 1000);
    return;
  }, [dispatch, id]);
  const error = useError();
  useEffect(() => {
    error.error && navigate("/");
  }, [error, navigate]);
  const person = useViewPerson();
  const { Title, Text } = Typography;
  if (!loading)
    return (
      <>
        <Alert message={"User is valid"} type={"success"} showIcon />
        {!error.error ? (
          <Row justify="center">
            <Space
              direction="vertical"
              align="center"
              style={{
                border: "solid 2px black",
                borderRadius: "1rem",
              }}
            >
              <Title level={4}>Section View Person</Title>
              <ul>
                <li>
                  <Title level={5} style={{ display: "inline" }}>
                    Name:
                  </Title>
                  <Text>{person?.name}</Text>
                </li>
                <li>
                  <Title level={5} style={{ display: "inline" }}>
                    Gender:
                  </Title>
                  <Text>{person?.gender}</Text>
                </li>
                <li>
                  <Title level={5} style={{ display: "inline" }}>
                    Email:{" "}
                  </Title>
                  <Text>{person?.email}</Text>
                </li>
                <li>
                  <Title level={5} style={{ display: "inline" }}>
                    Status:
                  </Title>
                  <Text>{person?.status}</Text>
                </li>
              </ul>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to page Main
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(`/editUser/${id}`);
                  }}
                >
                  Edit
                </Button>
              </Space>
            </Space>
          </Row>
        ) : (
          <Alert message={error.message} type={"error"} showIcon />
        )}
      </>
    );
  else {
    return (
      <>
        <Row justify="center">
          <Space
            direction="vertical"
            align="center"
            style={{
              border: "solid 2px black",
              borderRadius: "1rem",
            }}
          >
            <Title level={4}>Section View Person</Title>
          </Space>
        </Row>
        <Loading />
      </>
    );
  }
};
