export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.interval = 100;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 37: // Left
        game.movePieceLeft();
        view.render(game.getState());
        break;
      case 38: //Up
        game.rotatePiece();
        view.render(game.getState());
        break;
      case 39: //Right
        game.movePieceRight();
        view.render(game.getState());
        break;
      case 40: // Down
        game.movePieceDown();
        view.render(game.getState());
        break;
    }
  }

  speedTimer() {
    this.interval = 1000 - this.game.getState().level * 100;

    if (this.interval < 50) this.interval = 50;

    return this.interval;
  }
}