import { TextFieldProps } from "@mui/material";

export type Point = {
  x: number,
  y: number,
}

export type ElementItem = {
  type: string,
  points: Array<Point>,
};

export interface ElementProps {
  h: number;
  b: number;
}

export type CharacteristicItem = {
  name: string;
  value: string | number;
}


export interface ShapeElement<T> {
  type: string;
  form: Array<TextFieldProps>;
  elements: Array<ElementItem>;
  geometricalCharacteristics?: Array<CharacteristicItem>;
  calculateParams(props: T): Array<Point>;
  calculateGeometricalCharacteristics(props: T): void;
}
