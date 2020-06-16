import React, {useEffect, useState, useRef, useContext, useReducer} from "react";
import Axios from '_lib/api/index'

import { LOAD_FRANCHISE_LIST_REQUEST } from 'context/store'
import { useStore } from 'context/store'

import {Table, Typography, Space, Button, Input, BackTop} from "antd";
import Highlighter from 'react-highlight-words';
import {
  siwtchRegisterType,
  siwtchStatus,
  convertDateFormat,
  switchPlaceHolder,
} from '_util/index'
import {
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';



const {Text} = Typography;

const Home = (props) => {
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('')

  const {state, dispatch} = useStore();

  // console.log('====================')
  // console.log(state)
  // console.log('====================')

  const searchInput = useRef(null)

  useEffect(() => {
    fetchFranchiseList();
  }, []);

  const fetchFranchiseList = async () => {
    await Axios.get('/merchant_data.json')
      .then((res) => {
        const {data: {results}} = res;
        results.map((v) => {
          v.records = {...v}
          v.key = v.id;
          v.personSetName = v.personSet.name;
          v.personSetPhoneNumber = v.personSet.phonenumber;
          return false;
        });
        dispatch({type: LOAD_FRANCHISE_LIST_REQUEST, data: results})

        console.log('====================')
        console.log(results)
        console.log('====================')

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleChange = (pagination, filters, sorter, some) => {
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }

  const clearFilters = () => {
    setFilteredInfo(null)
    setSortedInfo(null)
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={searchInput}
          placeholder={`${switchPlaceHolder(dataIndex)} (으)로 검색`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
    onFilter: (value, record) => {
      return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: '신청일',
      dataIndex: 'records',
      key: 'created',
      width: 240,
      sorter: (a, b) => (new Date(a.created).getTime() - new Date(b.created).getTime()),
      sortOrder: sortedInfo && sortedInfo.columnKey === 'created' && sortedInfo.order,
      render: record => (<Text strong>{convertDateFormat(record.created)}</Text>),
    },
    {
      title: '신청유형',
      dataIndex: 'records',
      key: 'registerType',
      width: 100,
      filters: [
        {
          text: '신규',
          value: 'new',
        },
        {
          text: '명의변경',
          value: 'transfer',
        },
      ],
      filterMultiple: false,
      filteredValue: filteredInfo && (filteredInfo.registerType || null),
      onFilter: (value, record) => (record.registerType.includes(value)),
      render: record => (<Text strong>{siwtchRegisterType(record.registerType)}</Text>),
    },
    {
      title: '가맹점명',
      dataIndex: 'records',
      key: 'name',
      width: 120,
      ellipsis: true,
      filteredValue: filteredInfo && (filteredInfo.name || null),
      ...getColumnSearchProps('name'),
      render: record => (<Text strong>{record.name}</Text>),
    },
    {
      title: '사업자번호',
      dataIndex: 'records',
      key: 'businessNumber',
      width: 120,
      filteredValue: filteredInfo && (filteredInfo.businessNumber || null),
      ...getColumnSearchProps('businessNumber'),
      render: record => (<Text type='secondary'>{record.businessNumber}</Text>),
    },
    {
      title: '대표자명',
      dataIndex: 'records',
      width: 120,
      ellipsis: true,
      filteredValue: filteredInfo && (filteredInfo.personSetName || null),
      ...getColumnSearchProps('personSetName'),
      render: record => (<Text strong>{record.personSet.name}</Text>),
    },
    {
      title: '대표자 연락처',
      dataIndex: 'records',
      key: 'personSetPhoneNumber',
      width: 150,
      filteredValue: filteredInfo && (filteredInfo.personSetPhoneNumber || null),
      ...getColumnSearchProps('personSetPhoneNumber'),
      render: record => (<Text strong>{record.personSet.phonenumber}</Text>),
    },
    {
      title: '진행상태',
      dataIndex: 'records',
      key: 'status',
      width: 90,
      filters: [
        {
          text: '대기',
          value: 'pending',
        },
        {
          text: '진행중',
          value: 'inProgress',
        },
        {
          text: '취소됨',
          value: 'canceled',
        },
        {
          text: '완료',
          value: 'completed',
        },
      ],
      filteredValue: filteredInfo && (filteredInfo.status || null),
      onFilter: (value, record) => {
        console.log('진행상태 value: ', value)
        console.log('진행상태 record: ', record.status)
        return record.status.includes(value)
      },
      render: record => (siwtchStatus(record.id, record.status))
    },
    {
      title: '업데이트 일시',
      dataIndex: 'records',
      key: 'modified',
      width: 230,
      sorter: (a, b) => (new Date(a.modified).getTime() - new Date(b.modified).getTime()),
      sortOrder: sortedInfo && sortedInfo.columnKey === 'modified' && sortedInfo.order,
      render: record => (<Text>{convertDateFormat(record.modified)}</Text>),
    },
    {
      title: '신청 담당자',
      dataIndex: 'records',
      key: 'registerName',
      width: 240,
      ellipsis: true,
      render: record => (<Text>{record.register.name} / {record.register.phonenumber}</Text>)
    },
  ]

  /* render */
  return (
    <>
      <BackTop visibilityHeight={400} style={{right: '50px'}}/>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          type="dashed"
          icon={<ReloadOutlined/>}
          onClick={clearFilters}
          style={{marginBottom: '16px'}}
        >
          목록 초기화
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={state.franchiseList}
        bordered
        scroll={{x: 960}}
        pagination={{position: ['bottomCenter']}}
        onChange={handleChange}
        expandable={{
          expandedRowRender: record => (
            <ul style={{paddingLeft: '50px', listStyle: 'none', margin: 0}}>
              <li>
                <Text strong>설치 희망일:</Text> {convertDateFormat(record.installationRequestedDate)}<Text type='secondary'> / </Text>
                <Text strong>설치 희망 장소:</Text> {record.installationAddress}<Text type='secondary'> / </Text>
                <Text strong> 가맹점 연락처:</Text> {record.registrationContact}<Text type='secondary'> / </Text>
                <Text strong> 이메일:</Text> {record.email}<Text type='secondary'> / </Text>
                <Text strong>메모:</Text> {record.memo}
              </li>
              <li>

              </li>
            </ul>
          ),
          // rowExpandable: record => record.memo !== '',
        }}
        style={{whiteSpace: 'pre'}}
      />
    </>
  )
  /* render */
}


export default Home;