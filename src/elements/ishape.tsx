import { Shape } from "../enums";
import { CharacteristicItem, ElementProps, ShapeElement } from "../types";

export interface IShapElementProps extends ElementProps {
  h: number;
  b: number;
  Tf: number;
  Tw: number;
};

const iShapeElementFormFields = [
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
  {
    // componentType: 'text-field',
    type: 'number',
    label: 'Flange thickness[mm]',
    name: 'Tf',
    value: 2
    // validation
  },
  {
    // componentType: 'text-field',
    type: 'number',
    label: 'Web thickness[mm]',
    name: 'Tw',
    value: 1.5
    // validation
  },
];

class IShapeElement implements ShapeElement<IShapElementProps> {
  public type: string = Shape.IShape;
  public form = iShapeElementFormFields;
  public elements;
  public geometricalCharacteristics: Array<CharacteristicItem> = [];
  private initialValue: IShapElementProps = {
    h: 15,
    b: 10,
    Tf: 2,
    Tw: 1.5
  }
  constructor() {
    this.elements = [{
      type: 'polygon',
      points: this.calculateParams(this.initialValue)
    }]
    this.calculateGeometricalCharacteristics(this.initialValue);
  }

  calculateParams(props: IShapElementProps) {
    const { h, b, Tf, Tw } = props;
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
      y: h / 2 - Tf,
    }

    const p4 = {
      x: Tw / 2,
      y: h / 2 - Tf,
    }

    const p5 = {
      x: Tw / 2,
      y: - (h / 2 - Tf)
    }

    const p6 = {
      x: b / 2,
      y: -(h / 2 - Tf)
    }

    const p7 = {
      x: b / 2,
      y: -h / 2
    }

    const p8 = {
      x: -b / 2,
      y: -h / 2
    }

    const p9 = {
      x: -b / 2,
      y: -(h / 2 - Tf),
    }

    const p10 = {
      x: -(Tw / 2),
      y: - (h / 2 - Tf),
    }

    const p11 = {
      x: -Tw / 2,
      y: h / 2 - Tf
    }

    const p12 = {
      x: -b / 2,
      y: h / 2 - Tf,
    }

    return [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];
  };

  calculateGeometricalCharacteristics(props: IShapElementProps) {
    const { h, b, Tf, Tw } = props;
    this.geometricalCharacteristics = [{
      name: 'Area',
      value: 2 * b * Tf + (h - 2 * Tf) * Tw,
    },
    {
      name: 'Perimeter',
      value: 4 * b + 2 * h - 2 * Tw,
    },
    {
      name: 'Centroid',
      value: '[0, 0]'
    }];
  };
};

export const iShapeObj = new IShapeElement();