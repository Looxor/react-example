class Timeout {
  value: number;

  constructor(value) {
    this.value = value ? value : 0;
  }

  inMinutes() {
    return Math.round(this.value / 60);
  }
}

export default Timeout;
