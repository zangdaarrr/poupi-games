import * as ex from 'excalibur';
import { Color } from 'excalibur';

export class Brick extends ex.Actor {

  constructor(posX: number, posY: number, width: number, heigth: number, color: Color) {
    super(posX, posY, width, heigth, color);

    // Participe aux colisions
    this.collisionType = ex.CollisionType.Active;
  }
}
