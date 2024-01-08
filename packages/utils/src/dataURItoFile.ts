import dataURItoBlob from "./dataURItoBlob";
import isClientSide from "./isClientSide";

const dataURItoFile = (dataURL: string) => {
  if (isClientSide()) {
    return new File([dataURItoBlob(dataURL)], "current.csv", {
      type: "text/csv",
    });
  } else {
    return {
      name: "current.csv",
    } as File;
  }
};

export default dataURItoFile;
