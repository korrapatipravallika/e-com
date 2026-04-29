import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "../../features/ui/uiSlice";
import "./PopupDialog.css";

function PopupDialog() {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.ui.dialog);

  if (!dialog.isOpen) {
    return null;
  }

  return (
    <div className="dialog-backdrop" onClick={() => dispatch(hideDialog())}>
      <div
        className={`dialog-card dialog-card--${dialog.type}`}
        onClick={(event) => event.stopPropagation()}
      >
        <h3>{dialog.title}</h3>
        <p>{dialog.message}</p>
        <button className="primary-button" onClick={() => dispatch(hideDialog())}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupDialog;
