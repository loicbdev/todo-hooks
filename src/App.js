import React, { useState } from 'react';
import './App.css';
import {
  Table,
  Row,
  Col,
  Popconfirm,
  Typography,
  notification,
  Icon
} from 'antd';
import 'antd/dist/antd.css';

import TodoForm from './components/Form/form.component';

const { Paragraph } = Typography;

// TODO render a component here instead of a span?
// Replaced <span> {text} </span with this: https://ant.design/components/typography/

const openNotification = (placement, text) => {
  notification.info({
    message: `${text}`,
    placement
  });
};

function App() {
  const [form, setForm] = useState([
    {
      key: 0,
      title: 'Use Hooks in a React application ',
      completed: 'False'
    }
  ]);

  const [todos, setTodos] = useState([...form]);

  // TODO Add conditional rendering in render function
  // TODO Modify Completed state in onClick handler

  // render: text => <Paragraph>{text}</Paragraph>

  console.log('Todos:');
  console.log(todos);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Paragraph className={record.key}>{text}</Paragraph>
      )
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (text, record) => (
        <Paragraph>{text}</Paragraph>
      )
    },

    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <a
            href="#complete"
            onClick={e => {
              openNotification('bottomLeft', 'TODO completed');

              // https://www.robinwieruch.de/react-state-array-add-update-remove
              // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

              setTodos(laststate => {
                console.log(laststate);
                const list = laststate.map((value, index) => {
                  return {
                    key: index,
                    title: value.title,
                    completed: 'True'
                  };
                });
                return list;
              });
            }}
          >
            <Icon style={{ fontSize: '1.5em', width: '50px' }} type="check" />
          </a>

          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => {
              openNotification('bottomLeft', 'TODO deleted');
              // https://www.robinwieruch.de/react-state-array-add-update-remove
            }}
            okText="Yes"
            cancelText="No"
          >
            <a href="#delete">
              <Icon style={{ fontSize: '1.5em', width: '50px' }} type="close" />
            </a>
          </Popconfirm>
        </span>
      )
    }
  ];

  /*const addTodo = text => {
    const newData = [...form, text];
    setTodos(newData);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = 'true';
    setTodos(newTodos);
  };*/

  console.log('Update form ....');
  console.log('Todos from App.js ...');
  console.log(todos);
  if (form) {
    console.log(form);
  }

  return (
    <div className="App">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Table dataSource={todos} columns={columns} />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <TodoForm
            form={form}
            setForm={setForm}
            todos={todos}
            setTodos={setTodos}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
