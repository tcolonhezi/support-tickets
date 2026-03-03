import fs from "node:fs/promises";

interface DatabaseSchema {
  [table: string]: any[];
}

export class Database {
  #database: DatabaseSchema = {};

  #DATABASE_PATH = new URL("db.json", import.meta.url);

  constructor() {
    this.#load();
  }

  #load() {
    fs.readFile(this.#DATABASE_PATH, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }
  #persist() {
    fs.writeFile(this.#DATABASE_PATH, JSON.stringify(this.#database, null, 2));
  }

  select(table: string) {
    return this.#database[table] ?? [];
  }

  insert<T>(table: string, data: T): boolean {
    try {
      if (Array.isArray(this.#database[table])) {
        this.#database[table].push(data);
      } else {
        this.#database[table] = [data];
      }
      this.#persist();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
