import React, { useState } from "react";
import Modal from "../Modal"; // Import your modal component here

const ShowList = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const openModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  const handleSave = (item) => {
    // Save the item (either add new or update existing)
    if (currentItem) {
      setItems(items.map(i => i.id === currentItem.id ? item : i));
    } else {
      setItems([...items, item]);
    }
    closeModal();
  };

  return (
    <div>
      <h1>리스트 표시</h1>
      <button onClick={() => openModal(null)}>새 항목 추가</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => openModal(item)}>수정</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal item={currentItem} onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
};

export default ShowList;