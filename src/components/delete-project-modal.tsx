import { Modal } from "antd";

interface Props {
  onOk: (arg0: string) => void;
}

function ModalWarning({ onOk }: Props) {
  Modal.confirm({
    title: "Are you sure you want to delete this project?",
    content: "This action can't be undone",
    cancelText: "No",
    okText: "Yes",
    onOk,
  });
}

export default ModalWarning;
