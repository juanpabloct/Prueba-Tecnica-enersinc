import { Col, Form, Input, Row, Space, Typography, Select, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../connect";
import { People } from "../types";

export const AddPerson = () => {
  const { Text, Title } = Typography;
  const { Option } = Select;
  const [dataPerson, setDataPerson] = useState<People>({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  console.log(dataPerson);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Row align="middle" justify="center">
      <Col span={24}>
        <Title style={{ textAlign: "center" }} level={4}>
          Section Created Person
        </Title>
      </Col>
      <Space size={"middle"} style={{ display: "flex" }}>
        <Form>
          <Form.Item label={"Name"}>
            <Input
              required
              value={dataPerson.name}
              onChange={({ target }) => {
                const copyData = { ...dataPerson };
                copyData.name = target.value;
                setDataPerson(copyData);
              }}
            />
          </Form.Item>
          <Form.Item label={"Email"}>
            <Input
              required
              value={dataPerson.email}
              onChange={({ target }) => {
                const copyData = { ...dataPerson };
                copyData.email = target.value;
                setDataPerson(copyData);
              }}
            />
          </Form.Item>
          <Form.Item label={"Gender"}>
            <Select
              value={dataPerson.gender}
              onChange={(e) => {
                const copyData = { ...dataPerson };
                copyData.gender = e;
                setDataPerson(copyData);
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
                setDataPerson(copyData);
              }}
            >
              <Option value={"active"}>Active</Option>
              <Option value={"inactive"}>Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Row style={{ margin: "auto" }}>
              <Button
                type="primary"
                style={{ margin: "auto" }}
                disabled={
                  dataPerson.email !== "" &&
                  dataPerson.gender !== "" &&
                  dataPerson.name !== "" &&
                  dataPerson.status !== ""
                    ? false
                    : true
                }
                htmlType="submit"
                onClick={() => {
                  addUser(dataPerson, dispatch);
                  navigate("/");
                }}
              >
                Add Person
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Space>
    </Row>
  );
};
