import { Component, OnInit } from '@angular/core';
import * as ex from 'excalibur';

const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#00d2d3';
const FOOD_COLOUR = '#ee5253';
const START_FRAME_RATE = 10;

@Component({
  selector: 'app-jeux3',
  templateUrl: './jeux3.component.html',
  styleUrls: ['./jeux3.component.css']
})
export class Jeux3Component implements OnInit {

  ngOnInit() {

    // Récupération du canvas de la page et du contexte 2D
    const canvas = document.getElementById('canvas-snake') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    const tailleBloc = 10;
    const tailleGrille = canvas.width / tailleBloc;

    let frameRate = START_FRAME_RATE;
    let positionTete: { x: number, y: number };
    let velocite: { x: number, y: number };
    let food: { x: number, y: number };
    let snake: Array<{ x: number, y: number }>;

    function init() {
      positionTete = { x: 10, y: 10 };
      velocite = { x: 0, y: 0 };
      frameRate = START_FRAME_RATE;
      snake = [
        { x: 8, y: 10 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
      ];
      randomFood();

      // TODO mettre le son en pause
    }

    init();

    function randomFood() {
      food = {
        x: Math.floor(Math.random() * tailleGrille),
        y: Math.floor(Math.random() * tailleGrille),
      };

      // Permet de vérifier si il n'y a pas d'intersection entre mon serpent et ma nouriture
      for (const cell of snake) {
        if (cell.x === food.x && cell.y === food.y) {
          return randomFood();
        }
      }
    }

    document.addEventListener('keydown', keydown);

    function keydown(e: KeyboardEvent) {

      switch (e.keyCode) {
        // Fleche gauche
        case 37: {
          velocite = { x: -1, y: 0 };
          break;
        }
        // Fleche haut
        case 38: {
          velocite = { x: 0, y: -1 };
          break;
        }
        // Fleche droite
        case 39: {
          velocite = { x: 1, y: 0 };
          break;
        }
        // Fleche bas
        case 40: {
          velocite = { x: 0, y: 1 };
          break;
        }
        // TODO son si on se déplace
      }
    }

    // Exécute la boucle de jeux toute les secondes
    setInterval(() => {
      requestAnimationFrame(gameLoop);
    }, 1000 / frameRate);

    function gameLoop() {

      // Dessine la zone de jeu
      ctx.fillStyle = BG_COLOUR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessine le serpent
      ctx.fillStyle = SNAKE_COLOUR;
      for (const cell of snake) {
        ctx.fillRect(cell.x * tailleBloc, cell.y * tailleBloc, tailleBloc, tailleBloc);
      }

      // Dessine la nouriture
      ctx.fillStyle = FOOD_COLOUR;
      ctx.fillRect(food.x * tailleBloc, food.y * tailleBloc, tailleBloc, tailleBloc);

      // Met à jour la position en fonction de la vélocité
      positionTete.x += velocite.x;
      positionTete.y += velocite.y;

      // Lorsqu'on touche un bord
      if (positionTete.x < 0 || positionTete.x > tailleGrille || positionTete.y < 0 || positionTete.y > tailleGrille) {
        // TODO game over
        init();
      }

      // Quand la tête rentre en contact avec la nouriture on agrandi le serpent et on repositionne la nouriture
      if (food.x === positionTete.x && food.y === positionTete.y) {
        snake.push({ ...positionTete });
        positionTete.x += velocite.x;
        positionTete.y += velocite.y;
        randomFood();

        // On accélère le jeu
        frameRate++;
      }

      // Si on se déplace
      if (velocite.x !== 0 || velocite.y !== 0) {

        // on vérifie si la tête rentre en colision avec le reste du corp du serpent
        for (const cell of snake) {
          if (cell.x === positionTete.x && cell.y === positionTete.y) {
            // TODO game over
            return init();
          }
        }

        snake.push({ ...positionTete }); // Duplique la nouvelle position et l'ajoute au tableau du serpent
        snake.shift(); // Supprime le premier élément du tableau du serpent
      }
    }
  }
}
