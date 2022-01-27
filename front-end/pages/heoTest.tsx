import ReactModal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";

const HeoTest = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // modal 창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        모달창 열기
      </button>
      <div>
        <ReactModal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 9999,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(71, 71, 71, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "500px",
              height: "800px",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              boxShadow: "0px 10px 15px rgba(61,61,61,1)",
              inset: 0,
            },
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" onClick={closeModal}>
              <IoIosCloseCircle />
            </button>
          </div>
          <div>모달이랍니다.</div>
        </ReactModal>
      </div>
    </div>
  );
};

export default HeoTest;
