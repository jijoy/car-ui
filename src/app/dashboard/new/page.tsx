"use client"

import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Button, Checkbox, Form, FormProps, Input, InputNumber} from "antd";
import {redirect} from "next/navigation";
import React from "react";

export default function NewPage(){
    const mutation = useMutation({
        mutationFn: (value: FieldType) => {
            return axios.post('/api/car', value)
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
                'Creating a new car...'
            ) : (
                <>

                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? redirect('/dashboard/all') : null}

                    <Form name="basic"
                          labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          style={{maxWidth: 600}}
                          initialValues={{remember: true}}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off">
                        <Form.Item<FieldType>
                            label="Name"
                            name="modelName"
                            rules={[{required: true, message: 'Please give model name!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Seating"
                            name="seating"
                            rules={[{required: true, message: 'Enter number of seats'}]}
                        >
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Image"
                            name="image"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>

                    </Form>
                </>
            )}
        </div>)
}