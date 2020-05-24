import * as ex from 'excalibur';
import { PreCollisionEvent, CollisionType } from 'excalibur';

export class Ball extends ex.Actor {

  collisionType: CollisionType;

  constructor(private largeurScene: number) {

    // Creation de l'élément sur la scène
    super(100, 300, 20, 20, ex.Color.Red);

    // Velocité initiale de l'élément
    this.vel.setTo(400, 400);

    // On gère nous même les colision
    this.collisionType = ex.CollisionType.Passive;

    // Fonction de dessin de la balle
    this.draw = (ctx, delta) => {
      ctx.fillStyle = this.color.toString();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };
  }

  /**
   * Inverse la course de la balle lors d'une colision
   */
  inverseVelociteApresColision(event: PreCollisionEvent) {

    const intersection = event.intersection.normalize(); // Converti le vecteur en une longeur de 1

    // La composant du vecteur la plus grande sert d'axe d'inversion
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      this.vel.x *= -1;
    } else {
      this.vel.y *= -1;
    }
  }

  inverseVelociteSiHorsCadre() {
    // Si la balle touche le côté droit ou gauche on inverse la velocité en X
    if ((this.pos.x < this.width / 2) || (this.pos.x + this.width / 2 > this.largeurScene)) {
      this.vel.x *= -1;
    }

    // Si la balle touche le haut de l'écran on inverse la vélocité en Y
    if (this.pos.y < this.height / 2) {
      this.vel.y *= -1;
    }
  }
}
