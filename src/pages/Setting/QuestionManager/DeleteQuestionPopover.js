import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import subjectAPI from "../../../api/subjectAPI";
export default function DeleteQuestionPopover({
  subject_id,
  setIsLoadSubjectAgain,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSubject = async () => {
    const params = {
      id: subject_id,
    };
    await subjectAPI.delete(params).then((res) => {
      if (res.status == 200) {
        handleClose();
        setIsLoadSubjectAgain(true);
      }
    });
  };

  return (
    <div>
      <button className='btn text-danger' onClick={handleClickOpen}>
        <DeleteIcon />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Xoá môn học</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <ErrorOutlineIcon
            className='text-danger'
            sx={{ fontSize: "100px !important", margin: "auto" }}
          />
          <DialogContentText id='alert-dialog-description'>
            Bạn có chắc chắc muốn xoá môn học này?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <button className='btn btn-dark' onClick={handleClose}>
            Huỷ
          </button>
          <button className='btn btn-danger' onClick={deleteSubject} autoFocus>
            Xác nhận
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
