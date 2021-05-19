import { useState } from "react";
import { Typography, Avatar, Divider, Button, Table } from "antd";
import Icon from "@ant-design/icons";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import DeleteProjectModal from "./components/delete-project-modal";
import AddProjectModal from "./components/add-project-modal";
import Header from "./components/header";

import logo from "./assets/beaver 1.png";
import PlusImg from "./assets/plus.png";
import TrashImg from "./assets/delete.png";
import "./App.css";

interface Project {
  key: string;
  title: string;
  date: Date;
}

function App() {
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [input, setInput] = useState("");

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      render: (value: string) => {
        return {
          children: value,
          props: {
            colSpan: 0,
          },
        };
      },
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      colSpan: 1,
      render: () => {
        return {
          children: <Avatar src={logo} />,
          props: {
            colSpan: 1,
          },
        };
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      editable: true,
      shouldCellUpdate: (rec: any, prev: any) => rec !== prev,
      render: (text: string, record: { key: string }) => {
        return {
          children: (
            <Typography.Text
              editable={{ onChange: (v) => handleEdit(record.key, v) }}
              strong
            >
              {text}
            </Typography.Text>
          ),
          props: {
            colSpan: 3,
          },
        };
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: Date) => {
        return {
          children: (
            <Typography.Text type="secondary">
              {format(text, "PPP p")}
            </Typography.Text>
          ),
          props: {
            colSpan: 3,
          },
        };
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_text: string, record: { key: string }) => {
        return {
          children: (
            <Button
              type="text"
              icon={
                <Icon component={() => <img src={TrashImg} alt="Delete" />} />
              }
              onClick={() => handleDeleteModal(record.key)}
            />
          ),
          props: {
            colSpan: 1,
          },
        };
      },
    },
  ];

  const handleDeleteModal = (index: string) => {
    DeleteProjectModal({
      onOk: () => handleDelete(index),
    });
  };

  const handleEdit = (index: string, value: string) => {
    const updatedProjects = projects.map((proj) =>
      proj.key === index
        ? {
            ...proj,
            title: value,
          }
        : proj
    );

    setProjects(updatedProjects);
  };

  const handleConfirm = () => {
    const newProject: Project = {
      key: uuidv4(),
      title: input,
      date: new Date(),
    };

    setProjects((state) => [...state, newProject]);
    setInput("");
    setModal(false);
  };

  const handleDelete = (index: string) => {
    const updatedProjects = projects.filter((proj) => proj.key !== index);

    setProjects(updatedProjects);
  };

  return (
    <div className="App">
      <Header />
      <Button
        type="text"
        shape="circle"
        className="add-button"
        onClick={() => setModal(true)}
        icon={<Icon component={() => <img src={PlusImg} alt="Add" />} />}
      />
      <Divider />
      {projects.length >= 1 && (
        <Table
          className="table-spacing"
          columns={columns}
          dataSource={projects}
          pagination={false}
          showHeader={false}
        />
      )}

      <AddProjectModal
        isOpenModal={modal}
        inputValue={input}
        onCancel={() => setModal(false)}
        onChange={(e) => setInput(e.target.value)}
        onOk={handleConfirm}
      />
    </div>
  );
}

export default App;
