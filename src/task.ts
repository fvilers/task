import isBoolean from "@fvilers/is-boolean";
import isNumber from "@fvilers/is-number";
import isString from "@fvilers/is-string";
import FileFormatError from "./FileFormatError";

type Task = {
  id: number;
  task: string;
  done: boolean;
};

export default Task;

export function taskReviver(key: string, value: any): any {
  // We receive and empty key and the whole JSON in value at some point
  if (key === "" && value.isArray) {
    return value;
  }

  switch (key) {
    case "id":
      if (!isNumber(value)) {
        throw new FileFormatError();
      }

      return value;

    case "task":
      if (!isString(value)) {
        throw new FileFormatError();
      }

      return value;

    case "done":
      if (!isBoolean(value)) {
        throw new FileFormatError();
      }

      return value;

    default:
      // As we parse an array, we will receive the index of the item as the key
      if (!isNaN(parseInt(key, 10))) {
        return value;
      }

      throw new FileFormatError();
  }
}
