/*
type EntitySoundType = "start" | "move" | "stop";

interface WithSound {
    playSound(soundId: String): void
}

interface WithInput {
    handleInput (key: String): void
}

interface Movable {
    deltaX: number;
    deltaY: number;

    move(): void;
}

interface WithRender {
    render(): void;
}

class Manager implements WithSound {
    playSound(soundId: string) {
        console.log(`Playing sound ${soundId}`);
    }
}

class Entity implements WithSound, WithRender {
    sounds: Map<EntitySoundType, String> = new Map();

    // Można wydzielić na osobny interfejs
    playSound(soundId: string) {
        console.log(`Playing sound ${soundId}`);
    }

    render() {
        console.log('Rendering');
    }
}

class MovingEntity implements Movable {
    deltaX = 0;
    deltaY = 0;

    move(): void {
        console.log("Calculating movement")
    }
}

class Enemy {

    update() {  }
    render() {  }
}

class Obstacle {

    update() {  }
    render() {  }
}

class Player  {
    sounds: Map<EntitySoundType, String> = new Map([
        ["start", "player_start.mp3"],
        ["move", "player_move.mp3"],
        ["stop", "player_stop.mp3"],
    ]);

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
*/
