import React, {useContext, useReducer} from "react";
import { Row, Col, Divider, Form, Input, Button, Select, DatePicker } from 'antd';
import 'components/Register.css'

import {ADD_FRANCHISE_REQUEST, useStore} from 'context/store'
import { autoHypenPhone, onlyNumber } from '_util/index'

const { Option } = Select;



const Register = (props) => {
  const {state, dispatch} = useStore();
  const [form] = Form.useForm();

  // console.log('====================')
  // console.log(state)
  // console.log('====================')

  const onFinish = values => {
    const result = {
      id: 16,
      key: 16,
      businessNumber: values.businessNumber,
      created: new Date().toISOString(),
      email: values.email,
      installationAddress: values.installationAddress,
      installationRequestedDate: values.installationRequestdDate.format(),
      memo: "메모",
      modified: new Date().toISOString(),
      name: values.name,
      personSet: {id: 1, name: values.personSetName, phonenumber: values.personSetPhoneNumber},
      // personSetName: values.personSetName,
      // personSetPhoneNumber: values.personSetPhoneNumber,
      register: {id: 1, name: values.registerName, phonenumber: values.registerPhonenumber},
      registerType: values.registerType,
      registrationContact: values.registrationContact,
      status: "pending",
    }
    result.records = {...result}

    dispatch({type: ADD_FRANCHISE_REQUEST, data: result})
    props.history.replace('/')
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChangeHandlerInput = e => {
    const { value, name } = e.target;

    switch (name) {
      case 'registerName':
        form.setFieldsValue({registerName: value})
        break;
      case 'registerPhonenumber':
        form.setFieldsValue({registerPhonenumber: autoHypenPhone(value)})
        break;
      case 'personSetPhonenumber':
        form.setFieldsValue({personSetPhonenumber: autoHypenPhone(value)})
        break;
      case 'name':
        form.setFieldsValue({name: value})
        break;
      case 'businessNumber':
        form.setFieldsValue({businessNumber: onlyNumber(value)})
        break;
      case 'registrationContact':
          form.setFieldsValue({registrationContact: autoHypenPhone(value)})
        break;
      case 'email':
        form.setFieldsValue({email: value})
        break;
      case 'personSetName':
        form.setFieldsValue({personSetName: value})
        break;
      case 'installationAddress':
        form.setFieldsValue({installationAddress: value})
        break;

      default:
        console.log('name not found.')
        break;
    }
  };

  const onChangeHandlerRegisterType = value => {
    form.setFieldsValue({registerType: value})
  }

  const onChangeInstallationRequestdDate = value => {
    form.setFieldsValue({installationRequestdDate: value})
  }

  const onChangeShopOpenDate = value => {
    form.setFieldsValue({shopOpenDate : value})
  }

  return (
    <>
    <Form
      form={form}
      layout={'vertical'}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Row gutter={24} style={{padding: '12px 36px 24px'}}>
        {/* 신청자 정보 */}
        <Col className="gutter-row" span={24}>
          <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} plain>
            신청자 정보
          </Divider>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            label="신청 담당자"
            name="registerName"
            rules={[{ required: true, message: '신청 담당자를 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={30}
              name="registerName"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            label="신청 담당자 연락처"
            name="registerPhonenumber"
            rules={[{ required: true, message: '신청 담당자 연락처를 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={13}
              name="registerPhonenumber"
            />
          </Form.Item>
        </Col>


        {/* 가맹점 정보 */}
        <Col className="gutter-row" span={24}>
          <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} plain>
            가맹점 정보
          </Divider>
        </Col>

        <Col span={6}>
          <Form.Item
          label="신청유형"
          name="registerType"
          rules={[{ required: true, message: '신청유형을 선택해주세요.' }]}
        >
          <Select
            placeholder="신청유형을 선택해주세요."
            allowClear
            name="registerType"
            onChange={onChangeHandlerRegisterType}
          >
            <Option value="new">신규</Option>
            <Option value="transfer">명의변경</Option>
          </Select>
        </Form.Item>
        </Col>
        <Col span={18} />
        <Col span={6}>
          <Form.Item
            label="가맹점명"
            name="name"
            rules={[{ required: true, message: '가맹점명을 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={30}
              name="name"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="사업자번호"
            name="businessNumber"
            rules={[{ required: true, message: '사업자번호를 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={10}
              name="businessNumber"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="매장전화번호"
            name="registrationContact"
            rules={[{ required: true, message: '매장전화번호를 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={13}
              name="registrationContact"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: '올바른 형식의 E-mail이 아닙니다.',
              },
              {
                required: true,
                message: 'E-mail을 입력해주세요.',
              },
            ]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={30}
              name="email"
            />
          </Form.Item>
        </Col>

        {/* 대표자 정보 */}
        <Col className="gutter-row" span={24}>
          <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} plain>
            대표자 정보
          </Divider>
        </Col>
        <Col span={6}>
          <Form.Item
            label="대표자명"
            name="personSetName"
            rules={[{ required: true, message: '대표자명을 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={13}
              name="personSetName"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="대표자 연락처"
            name="personSetPhonenumber"
            rules={[{ required: true, message: '대표자 연락처를 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={13}
              name="personSetPhonenumber"
            />
          </Form.Item>
        </Col>

        {/* 설치 정보 */}
        <Col className="gutter-row" span={24}>
          <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} plain>
            설치 정보
          </Divider>
        </Col>
        <Col span={6}>
          <Form.Item
            label="설치장소"
            name="installationAddress"
            rules={[{ required: true, message: '설치장소를 입력해주세요.' }]}
            onChange={onChangeHandlerInput}
          >
            <Input
              maxLength={240}
              name="installationAddress"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="installationRequestdDate"
            label="설치 희망일"
            rules={
              [
                {
                  type: 'object',
                  required: true,
                  message: '설치 희망일을 선택해주세요.',
                },
              ]
            }
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              onChange={onChangeInstallationRequestdDate}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="shopOpenDate"
            label="매장 오픈일"
            rules={
              [
                {
                  type: 'object',
                },
              ]
            }
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              onChange={onChangeShopOpenDate}
            />
          </Form.Item>
        </Col>

        <Col span={2} offset={22} style={{marginTop: '18px'}}>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              등록
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Register;