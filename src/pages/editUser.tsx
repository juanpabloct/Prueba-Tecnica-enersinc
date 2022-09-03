import { current } from "@reduxjs/toolkit";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from "../connect";
import {
  useError,
  useViewPerson,
} from "../hooks Personalities/allHooksReducer";
import { editPeopleView } from "../reducers/reducerPeople";

export const EditUser = () => {
  const { id } = useParams();
  const dataPerson = useViewPerson();
  const [showModal, setShowModal] = useState(false);
  const { Title } = Typography;
  const dispatch = useDispatch();
  const error = useError();
  const navigate = useNavigate();
  useEffect(() => {
    id && getUser(dispatch, +id);
  }, [id, dispatch]);
  const { Option } = Select;
  const changeState = () => setShowModal((current) => !current);

  return (
    <Row align="middle" justify="center">
      <Col span={24}>
        <Title style={{ textAlign: "center" }} level={2}>
          Section Edit
        </Title>
      </Col>
      <Space size={"middle"}>
        <Form>
          <Form.Item label={"Name"}>
            <Input
              value={dataPerson?.name}
              onChange={({ target }) => {
                const copyData = { ...dataPerson };
                copyData.name = target.value;
                dispatch(editPeopleView(copyData));
              }}
            />
          </Form.Item>
          <Form.Item label={"Email"}>
            <Input
              value={dataPerson.email}
              onChange={({ target }) => {
                const copyData = { ...dataPerson };
                copyData.email = target.value;
                dispatch(editPeopleView(copyData));
              }}
            />
          </Form.Item>
          <Form.Item label={"Gender"}>
            <Select
              value={dataPerson.gender}
              onChange={(e) => {
                const copyData = { ...dataPerson };
                copyData.gender = e;
                dispatch(editPeopleView(copyData));
              }}
            >
              <Option value={"male"}>Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item label={"Status"}>
            <Select
              value={dataPerson.status}
              onChange={(e) => {
                const copyData = { ...dataPerson };
                copyData.status = e;
                dispatch(editPeopleView(copyData));
              }}
            >
              <Option value={"active"}>Active</Option>
              <Option value={"inactive"}>Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  id && editUser(dataPerson, +id, dispatch);
                  changeState();
                }}
              >
                Save change
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to main Page
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
      {showModal && (
        <Modal visible={showModal} onOk={changeState} onCancel={changeState}>
          <Alert type="success" message={error.message} />
        </Modal>
      )}
    </Row>
  );
};
