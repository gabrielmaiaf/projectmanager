import { Input, Modal } from "antd";

interface AddProjectModalProps {
  isOpenModal: boolean;
  inputValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onOk: () => void;
  onCancel: () => void;
}

function AddProjectModal({
  isOpenModal,
  inputValue,
  onChange,
  onOk,
  onCancel,
}: AddProjectModalProps) {
  return (
    <Modal
      title="Add a new project"
      visible={isOpenModal}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Input
        placeholder="Project name"
        value={inputValue}
        onChange={onChange}
      />
    </Modal>
  );
}

export default AddProjectModal;
