import { Shape } from "../enums";
import { CharacteristicItem, ElementProps, ShapeElement } from "../types";

export interface RectangleElementProps extends ElementProps {
  h: number;
  b: number;
};

const formFields = [
  {
    // componentType: 'text-field',
    type: 'number',
    label: 'Height[mm]',
    name: 'h',
    value: 15
    // validation
  },
  {
    // componentType: 'text-field',
    type: 'number',
    label: 'Width[mm]',
    name: 'b',
    value: 10,
    // validation
  },
];


class RectangleElement implements ShapeElement<RectangleElementProps> {
  public type: string = Shape.Rectangle;
  public form = formFields;
  public elements;
  public geometricalCharacteristics: Array<CharacteristicItem> = [];
  private initialValue: RectangleElementProps = {
    h: 15,
    b: 10,
  }
  constructor() {
    this.elements = [{
      type: 'polygon',
      points: this.calculateParams(this.initialValue)
    }]
    this.calculateGeometricalCharacteristics(this.initialValue);
  }

  calculateParams(props: RectangleElementProps) {
    const { h, b } = props;
    // calculate points
    const p1 = {
      x: -b / 2,
      y: h / 2,
    };

    const p2 = {
      x: b / 2,
      y: h / 2,
    }

    const p3 = {
      x: b / 2,
      y: -h / 2,
    }

    const p4 = {
      x: -b / 2,
      y: -h / 2,
    }
    return [p1, p2, p3, p4];
  };

  calculateGeometricalCharacteristics(props: RectangleElementProps) {
    const { h, b } = props;
    this.geometricalCharacteristics = [{
      name: 'Area',
      value: h * b,
    },
    {
      name: 'Perimeter',
      value: 2 * (b + h),
    },
    {
      name: 'Centroid',
      value: '[0, 0]'
    }];
  };
}

export const rectangleObj = new RectangleElement();
