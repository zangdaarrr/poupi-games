import { Component, AfterViewInit } from '@angular/core';
import * as ex from 'excalibur';
import { Paddle } from './paddle.class';
import { Ball } from './ball.class';
import { Brick } from './brick.class';
import { Engine } from 'excalibur';

const TEMPS_AVANT_DEMARRAGE = 3;

@Component({
  selector: 'app-jeux1',
  templateUrl: './jeux1.component.html',
  styleUrls: ['./jeux1.component.css']
})
export class Jeux1Component {

  game: Engine;

  sonColision: HTMLAudioElement;

  musique: HTMLAudioElement;

  compteurDemarrage: number;

  constructor() {
    this.sonColision = this.creeSon('/assets/sons/pop.mp3', 0.2, 0.5);
    this.musique = this.creeSon('/assets/sons/tetris.mp3', 0);
  }

  creeSon(fichier: string, debut: number, fin: number = null): HTMLAudioElement {
    const son = document.createElement('audio');
    son.src = fichier;
    son.currentTime = debut;
    if (fin !== null) {
      son.addEventListener('timeupdate', () => {
        if (son.currentTime > fin) {
          son.pause();
          son.currentTime = debut;
        }
      });
    } else {
      son.loop = true;
    }
    return son;
  }

  createGame() {
    // Créé l'instance du moteur de jeux
    this.game = new ex.Engine({
      // Taille de la fenêtre
      width: 1600,
      height: 600,
      canvasElementId: 'jeux1'
    });

    const paddle = new Paddle(150, this.game.drawHeight - 40);
    this.game.add(paddle);

    // Add a mouse move listener
    this.game.input.pointers.primary.on('move', (evt: any) => {
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
        this.sonColision.play();

        // Si toutes les briques sont détruite fin du jeux
        if (killedBricks === bricks.length) {
          alert('Bravo !');
          this.stop();
        }
      }

      ball.inverseVelociteApresColision(ev);
    });

    // En cas de sortie fin du jeux
    ball.on('exitviewport', () => {
      alert(`Perdu !`);
      this.stop();
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
    const columns = 10;
    const rows = 4;
    const brickWidth = this.game.drawWidth / columns - padding - padding / columns;
    const brickHeight = 30;

    // Couleurs possibles pour le briques
    const brickColors = [ex.Color.Red, ex.Color.Orange, ex.Color.Yellow];

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
    this.compteurDemarrage = TEMPS_AVANT_DEMARRAGE;
    this.start();
  }

  /**
   * Cette methode permet d'afficher un compteur avant le démarrage du jeux
   *
   * @param compteur temps en secondes avant démarrage du jeu
   */
  start() {
    setTimeout(() => {
      this.compteurDemarrage = this.compteurDemarrage - 1;
      if (this.compteurDemarrage > 0) {
        this.start();
      } else {
        this.compteurDemarrage = null;
        this.game.start();
        this.musique.play();
      }
    }, 1000);
  }

  stop() {
    this.game.stop();
    this.musique.pause();
  }
}
