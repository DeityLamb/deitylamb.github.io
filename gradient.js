export class Gradient {

  #colors;
  #iteration = 1;

  constructor(from, to, steps) {
    this.#colors = this.#generateColors(from, to, steps);
  }

  next() {

    if (Math.floor((this.#iteration - 1) / 2) % 2 && this.#iteration % this.#colors.length === 0) {
      this.#iteration = 1;
    }

    const index = Math.floor(this.#iteration / this.#colors.length) % 2 === 0
      ? this.#iteration % this.#colors.length
      : this.#colors.length - (this.#iteration % this.#colors.length) - 1

    this.#iteration++;

    return this.#colors[index - 1];
  }

  get current() {
    return this.#colors[this.#iteration % this.#colors.length]
  }

  #generateColors(from, to, steps) {

    const start = this.#convertToRGB(from);
    const end = this.#convertToRGB(to);

    const saida = [];

    for (let i = 0; i < steps; i++) {
      const alpha = (1 / steps) * i;

      const hex = this.#convertToHex([
        start[0] * alpha + (1 - alpha) * end[0],
        start[1] * alpha + (1 - alpha) * end[1],
        start[2] * alpha + (1 - alpha) * end[2]
      ])

      saida.push(hex);
    }

    console.log(saida);

    return saida;
  }

  #convertToRGB(hex) {
    return [
      parseInt((this.#trim(hex)).substring(0, 2), 16),
      parseInt((this.#trim(hex)).substring(2, 4), 16),
      parseInt((this.#trim(hex)).substring(4, 6), 16),
    ]
  }

  #convertToHex([red, green, blue]) {
    return '#' + this.#hex(red) + this.#hex(green) + this.#hex(blue);
  }

  #hex(rgb) {
    const charset = "0123456789abcdef";
    let color = parseInt(rgb);
    if (color === 0) return "00";
    color = Math.round(Math.min(Math.max(0, color), 255));
    return charset.charAt((color - color % 16) / 16) + charset.charAt(color % 16);
  }

  #trim(color) {
    return color.charAt(0) == '#'
      ? color.substring(1, 7)
      : color
  }
}
