export interface Attributes {
  name: string;
  type: string;
  default: string;
  desc: string;
  required: string;
  body?: string; // 可选 属性片段
}

export interface CompletionObject {
  [key: string]: {
    // name?: string; // 可选属性
    attrs: Attributes[];
  };
}
