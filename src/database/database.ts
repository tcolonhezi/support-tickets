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

  select(table: string, filter?: Partial<any>) {
    let data = this.#database[table] ?? [];
    const validFilter =
      filter &&
      Object.entries(filter).some(([key, value]) => {
        return key.trim() !== "" && value !== undefined && value !== null;
      });
    // console.log("Applying filter:", filter, "Valid filter:", validFilter);
    if (validFilter) {
      data = data.filter((item) => {
        return Object.entries(filter).some(([key, value]) => {
          // console.log("Filtering item:", item, "Key:", key, "Value:", value);
          if (!item[key] || !value) return false;
          const itemValue = String(item[key].toLowerCase());
          const filterValue = String(value.toLowerCase());
          return itemValue.includes(filterValue);
        });
      });
    }
    // console.log(data);
    return data;
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

  update(table: string, id: string, data: object): any {
    const index = this.#database[table].findIndex((item) => item.id === id);
    if (index > -1) {
      const currentData = this.#database[table][index];
      this.#database[table][index] = { ...currentData, ...data };
      this.#persist();
      return this.#database[table][index];
    }
    return null;
  }

  delete(table: string, id: string): boolean {
    const index = this.#database[table].findIndex((item) => item.id === id);
    if (index > -1) {
      this.#database[table].splice(index, 1);
      this.#persist();
      return true;
    }
    return false;
  }
}
