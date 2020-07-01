export default class View {
  static colors = {
    '1': 'green',
    '2': 'blue',
    '3': 'purple',
    '4': 'white',
    '5': 'teal',
    '6': 'lime',
    '7': 'aqua'
  }

  constructor(elem, width, height, rows, columns) {
    this.elem = elem;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.playfielBorderWidth = 4;
    this.playfieldX = this.playfielBorderWidth;
    this.playfieldY = this.playfielBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfielBorderWidth * 2;
    this.playfieldInnerHeight = this.playfieldHeight - this.playfielBorderWidth * 2;

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHeight / rows;

    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.height;

    this.elem.appendChild(this.canvas);
  }

  render(state) {
    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);    
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderEndScreen({score}) {
    this.clearScreen();

    this.context.fillStyle = 'white';
    this.context.font = '36px ""';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('GAME OVER', this.width / 2, this.height / 4);
    this.context.fillText('F5 - START GAME', this.width / 2, this.height / 1.5);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
  }

  renderPlayfield({playfield}) {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
            x * this.blockWidth + this.playfieldX, 
            y * this.blockHeight + this.playfieldY, 
            this.blockWidth, 
            this.blockHeight, 
            View.colors[block])
        }
      }
    }

    this.context.strokeStyle = 'white';
    this.context.lineWidth = this.playfielBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
  }

  renderPanel({level, score, lines, nextPiece}) {
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'white';
    this.context.font = '14px "Press Start 2P"';

    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
    this.context.fillText(`Next:`, this.panelX, this.panelY + 80);
    this.context.font = '14px ""';
    this.context.fillText(`^ : переворот`, this.panelX, this.panelY + 560);
    this.context.fillText(`< : движение влево`, this.panelX, this.panelY + 580);
    this.context.fillText(`> : движение вправо`, this.panelX, this.panelY + 600);

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];

        if (block) {
          this.renderBlock(
            x * this.blockWidth * 0.5 + this.panelX,
            y * this.blockHeight * 0.5 + 100 + this.panelY,
            this.blockWidth * 0.5,
            this.blockHeight * 0.5,
            View.colors[block]
          );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}