export abstract class Vehiculo {
  constructor(
    protected marca: string,
    protected modelo: string,
    protected año: number,
    protected color: string
  ) {}

  abstract arrancar(): void;
  abstract detener(): void;

  public getColor(): string {
        return this.color;
    }
}

