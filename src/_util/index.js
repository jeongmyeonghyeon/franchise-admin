import React from 'react';
import {Tag} from "antd";

export const siwtchRegisterType = (registerType) => {
  switch (registerType) {
    case 'transfer':
      return '명의변경'
    default:
      return '신규'
  }
}

export const siwtchStatus = (id, status) => {
  switch (status) {
    case 'inProgress':
      return <Tag color="green" key={id}>진행중</Tag>
    case 'completed':
      return <Tag color="geekblue" key={id}>완료</Tag>
    case 'canceled':
      return <Tag color="red" key={id}>취소됨</Tag>
    default:
      return <Tag color="gold" key={id}>대기</Tag>
  }
}

export const convertDateFormat = (str, isBrakeLine = false) => {
  const date = new Date(str);

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const hours = date.getHours() > 12 ? (`오후 ${date.getHours() - 12}`) : (`오전 ${date.getHours()}`);
  // const br = isBrakeLine ? '\n' : ' ';

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${week[date.getDay()]}) ${hours}:${date.getMinutes()}`
}

export const switchPlaceHolder = (dataIndex) => {
  switch (dataIndex) {
    case 'name':
      return '가맹점명'
    case 'businessNumber':
      return '사업자번호'
    case 'personSetName':
      return '대표자명'
    case 'personSetPhoneNumber':
      return '대표자 연락처'
    default:
      return ''
  }
}

export const autoHypenPhone = (str) => {
  str = str.replace(/[^0-9]/g, '');
  var tmp = '';
  if( str.length < 4){
    return str;
  }else if(str.length < 7){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  }else if(str.length < 11){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  }else{
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
  return str;
}

export const onlyNumber = (str) => {
  const reg = /[^0-9]/g;
  return str.replace(reg, '')
}