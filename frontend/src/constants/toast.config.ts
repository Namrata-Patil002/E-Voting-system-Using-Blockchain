interface toastConfigInterface {
  position:
    | undefined
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  progress: undefined;
  theme: "light" | "dark" | "colored";
}
export const toastConfig: toastConfigInterface = {
  position: "top-right",
  autoClose: 1300,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined,
  theme: "light",
};
