import type { Project } from "payload/generated-types"

export type SerializedLexicalNode = {
  children: SerializedLexicalNode[];
  direction: string;
  format: number | string;
  indent?: string | number;
  type: string;
  version: number;
  url?: string;
  style?: string;
  mode?: string;
  text?: string;
  [other: string]: any;
};

export type LexicalRootNode = SerializedLexicalNode & { 
  root: SerializedLexicalNode
  [other: string]: any;
};


/* Extended Collections */
export type ExtendedProject = Omit<Project, "content" | "description"> & {
  content?: LexicalRootNode,
  description?: LexicalRootNode,
} 