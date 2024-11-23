import React, { useState } from "react";

const Modal = ({ item, onClose, onSave }) => {
  const [name, setName] = useState(item?.name || "");

  const handleSubmit = () => {
    const newItem = item ? { ...item, name } : { id: Date.now(), name };
    onSave(newItem);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{item ? "데이터 수정" : "데이터 추가"}</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="이름 입력" 
        />
        <button onClick={handleSubmit}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default Modal;