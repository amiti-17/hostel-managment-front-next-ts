import CustomError from "@/CustomError";

const displayArray = (array: any[]) => {
  if (typeof array !== "object") {
    throw new CustomError("displayArray expects an array");
  }
  return array.join(", ");
};

export default displayArray;
