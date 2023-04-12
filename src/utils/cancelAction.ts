let cancelAction = false;

export const setCancelAction = () => {
  cancelAction = !cancelAction;
};

export const getCancelAction = () => {
  return cancelAction;
};
