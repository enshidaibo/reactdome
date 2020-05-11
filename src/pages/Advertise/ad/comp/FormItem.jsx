import React, { Component } from "react";
import { Form } from 'antd';

class FormItem extends Component {

    render () {
        let { offset } = this.props;
        const labelCol = {
            xs: { span: 2 },
            sm: { span: 3 },
        }
        const wrapperCol = offset ? {
            xs: { span: 18, offset: 2 },
            sm: { span: 18, offset: 3 },
        } : {
            xs: { span: 18 },
            sm: { span: 18 },
        };
        return (
            <Form.Item 
                label={this.props.label}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
            >
            {this.props.children}
            </Form.Item>
        )
    }
}

export default FormItem;