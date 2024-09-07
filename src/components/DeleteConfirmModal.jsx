// DeleteConfirmModal.js
import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DeleteConfirmModal({
  open,
  handleOpen,
  onDelete,
  title = "Do you want to delete this?",
  message = "After clicking the confirm button, the data will be deleted permanently.",
}) {
  const handleConfirmDelete = () => {
    onDelete();
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="flex items-center gap-1 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 text-red-800"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M2.25 12c0-5.385..." clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-bold text-black">{title}</h1>
      </div>
      <DialogBody>{message}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="black"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleConfirmDelete}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
