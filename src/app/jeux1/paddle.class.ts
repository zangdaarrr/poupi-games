import * as ex from 'excalibur';
import { Actor, CollisionType } from 'excalibur';

export class Paddle extends Actor {

  collisionType: CollisionType;

  constructor(posX: number, posY: number) {

    // Création de l'élément sur la scène
    super(posX, posY, 200, 20, ex.Color.Chartreuse);

    // Participe aux colision mais ne peut pas être bougé
    this.collisionType = ex.CollisionType.Fixed;
  }
}
