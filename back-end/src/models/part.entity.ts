export class PartCategory {
  constructor(name: string, code: string, description?: string) {
    this.name = name;
    this.code = code;
    this.description = description;
  }
  name: string;
  code: string;
  description?: string;
}
