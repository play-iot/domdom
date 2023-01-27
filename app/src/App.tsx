import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { DebounceTextInput } from '@components';
import '@style/App.less';
import { hello } from '@domdom/wire';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  TimePicker,
  Typography,
} from 'antd';
import Search from 'antd/es/input/Search';

const { Title } = Typography;

const App = () => (
  <>
    <section style={{ textAlign: 'center', marginTop: 48, marginBottom: 40 }}>
      <Space align='start'>
        <img
          style={{ width: 40, height: 40 }}
          src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
          alt='Ant Design'
        />
        <Title level={2} style={{ marginBottom: 0 }}>
          <DesktopOutlined />
          <FileOutlined />
          <PieChartOutlined />
          <TeamOutlined />
          <UserOutlined />
          Ant Design
        </Title>
      </Space>
    </section>
    <Divider style={{ marginBottom: 60 }}>Form</Divider>
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Form.Item label='123'>
        <InputNumber min={1} max={10} defaultValue={3} />
        <span className='ant-form-text'>{hello}</span>
        <a href='https://ant.design'>Hey</a>
      </Form.Item>
      <Form.Item label='as'>
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item label='input1'>
        <DebounceTextInput value={123} debounceTimeout={2000} onChange={(e) => console.log(e.target.value)} />
      </Form.Item>
      <Form.Item label='input2'>
        <Input defaultValue={'abc'} onChange={(e) => console.log(e.target.value)} />
      </Form.Item>
      <Form.Item label='search'>
        <Search onSearch={(value) => console.log(value)} />
      </Form.Item>
      <Form.Item label='1212'>
        <Slider defaultValue={70} />
      </Form.Item>
      <Form.Item label='asd'>
        <Select defaultValue='lucy' style={{ width: 192 }}>
          <Select.Option value='jack'>jack</Select.Option>
          <Select.Option value='lucy'>lucy</Select.Option>
          <Select.Option value='disabled' disabled>
            disabled
          </Select.Option>
          <Select.Option value='yiminghe'>yiminghe</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label='cxvb'>
        <DatePicker />
      </Form.Item>
      <Form.Item label='zxbv'>
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item label='Time picker'>
        <TimePicker />
      </Form.Item>
      <Form.Item label='as'>
        <Rate defaultValue={5} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  </>
);

export default App;
