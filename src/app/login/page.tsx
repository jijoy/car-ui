"use client"

import {Button, Checkbox, Form, FormProps, Input} from "antd";
import React from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {redirect} from "next/navigation";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


export default function LoginPage() {

    const mutation = useMutation({
        mutationFn: (value: FieldType) => {
            return axios.post('/api/login', value)
        },
    })


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutation.mutate(values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {mutation.isPending ? (
                'Adding todo...'
            ) : (
                <>

                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? redirect('/dashboard') : null}

                    <Form name="basic"
                          labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          style={{maxWidth: 600}}
                          initialValues={{remember: true}}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off">
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Please input your Email!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{offset: 8, span: 16}}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </>
                )}
        </div>)
}