//modal//

export const ModalOverlay = {
  position: "fixed",
  zIndex: 1020,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(71, 71, 71, 0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const ModalContent = {
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
};

export const BasicModal = {
  overlay: ModalOverlay,
  content: ModalContent,
};
