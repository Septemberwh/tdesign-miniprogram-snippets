export interface Attributes {
  name: string;
  type: string;
  default: string;
  desc: string;
  required: string;
}

export interface CompletionObject {
  [key: string]: {
    // name?: string; // 可选属性
    attrs: Attributes[];
  };
}
