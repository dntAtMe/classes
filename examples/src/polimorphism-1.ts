class Enemy {
    update() {  }
    render() {  }
}

class Obstacle {

    update() {  }
    render() {  }
}

class Player  {

    readInput() {  }
    update() {  }
    render() {  }
}

const enemies: Enemy[] = [];
const obstacles: Obstacle[] = [];
let player: Player | undefined;

function Setup() {
    enemies.push( new Enemy() );
    obstacles.push( new Obstacle() );

    player = new Player();
}

function StartLoop() {
    Setup();

    while (true) {
        player?.readInput();

         enemies.forEach(enemy => {
            enemy.update();
        });
        obstacles.forEach(obstacle => {
            obstacle.update();
        });
        player?.update();

        enemies.forEach(enemy => {
            enemy.render();
        });
        obstacles.forEach(obstacle => {
            obstacle.render();
        });
        player?.render();
    }
}
