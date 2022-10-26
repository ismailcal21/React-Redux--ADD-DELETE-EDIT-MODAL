import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, setShowModal, sil, title, aciklama, aciklama2 } =
    props;
  return (
    <div
      className="d-flex justify-content-center align-items-center font"
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        // className="bg-danger"
        style={{
          width: "30%",
          height: "30%",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "5px 5px 50px 5px",
          overflow: "hidden",
          overflowX: "hidden",
        }}
      >
        <div className=" my-1">
          <p>
            <h1 style={{ fontSize: "25px" }} className="text-center my-1">
              {title}
            </h1>
          </p>
          <p>
            <h4 className="text-center mx-2">
              <div>
                {aciklama} {aciklama2}
              </div>
            </h4>
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "50%" }}
        >
          <button
            onClick={() => onCancel(setShowModal)}
            type="button"
            className="btn btn-danger mx-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(sil)}
            type="button"
            className="btn btn-primary"
          >
            {" "}
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
