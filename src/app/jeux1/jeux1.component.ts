import { Component, AfterViewInit } from '@angular/core';
import * as ex from 'excalibur';
import { Paddle } from './paddle.class';
import { Ball } from './ball.class';
import { Brick } from './brick.class';
import { Engine } from 'excalibur';

@Component({
  selector: 'app-jeux1',
  templateUrl: './jeux1.component.html',
  styleUrls: ['./jeux1.component.css']
})
export class Jeux1Component {

  game: Engine;

  constructor() { }

  createGame() {
    // Créé l'instance du moteur de jeux
    this.game = new ex.Engine({
      // Taille de la fenêtre
      width: 800,
      height: 600,
      canvasElementId: 'jeux1'
    });

    const paddle = new Paddle(150, this.game.drawHeight - 40);
    this.game.add(paddle);

    // Add a mouse move listener
    this.game.input.pointers.primary.on('move', (evt) => {
      paddle.pos.x = evt.target.lastWorldPos.x;
    });

    // Create a ball
    const ball = new Ball(this.game.drawWidth);

    // Gestion des colisions de la balle
    let killedBricks = 0;
    ball.on('precollision', (ev) => {

      // Si l'élément rencontré est une brique alors on la détruit
      if (bricks.indexOf(ev.other) !== -1) {

        ev.other.kill();
        killedBricks++;

        // Si toutes les briques sont détruite fin du jeux
        if (killedBricks === bricks.length) {
          alert('Bravo !');
          this.game.stop();
        }
      }

      ball.inverseVelociteApresColision(ev);
    });

    // En cas de sortie fin du jeux
    ball.on('exitviewport', () => {
      alert(`Ahahaha mais quel mauvais :D`);
      this.game.stop();
    });

    // Permet de faire rebondir la balle sur le cadre (gauche/droite/haut)
    ball.on('postupdate', () => {
      ball.inverseVelociteSiHorsCadre();
    });

    // Ajoute la balle à la scéne
    this.game.add(ball);

    // Taille des briques
    const padding = 20;
    const xoffset = 65;
    const yoffset = 20;
    const columns = 5;
    const rows = 3;
    const brickWidth = this.game.drawWidth / columns - padding - padding / columns;
    const brickHeight = 30;

    // Couleurs possibles pour le briques
    const brickColors = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];

    // Creation des briques
    const bricks = [];

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        const brick = new Brick(
          xoffset + i * (brickWidth + padding) + padding,
          yoffset + j * (brickHeight + padding) + padding,
          brickWidth,
          brickHeight,
          brickColors[j % brickColors.length]
        );
        bricks.push(brick);
        this.game.add(brick);
      }
    }

    // Démarrer le moteur de jeux
    this.game.start();
  }
}
