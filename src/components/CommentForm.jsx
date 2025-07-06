import React, {useEffect} from "react";
import { Button, Form, Input } from "antd";

const {TextArea} = Input;

const CommentForm = ({onFormSubmit, initialValues}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const onFinish = (values) => {
    onFormSubmit(values);
    form.resetFields();
  }


  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email'}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Your Comment"
        name="body"
        rules={[{ required: true}]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;