// 在一个函数里，改变传入的对象本身是不好的
// 由于js中的对象是引用对象，如果不仔细阅读的话，调用你的函数，传入的对象就会被污染了
// export const cleanObject = (object) => {
//     object.name = '污染'  // 调用后，name就会变成污染
// }

import React, { useState, useEffect } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value); // 对0判断 !!对布尔的转换
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key: string) => {
    // @ts-ignore
    const value = result[key];
    if (isVoid(value)) {
      // 对false undefined等的判断，这里还对0进行了判断，因为0在key中是有用的
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 范型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一次useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
