import fs from "fs/promises";
const databasePath = new URL("../db.json", import.meta.url);
export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((dados) => {
        this.#database = JSON.parse(dados);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile("db.json", JSON.stringify(this.#database));
  }
  select(tabela, search) {
    let dados = this.#database[tabela] ?? [];
    if (search) {
      dados = dados.filter((linha) => {
        return Object.entries(search).some(([key, value]) => {
          return linha[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    console.log({ dados });
    return dados;
  }

  insert(tabela, dados) {
    if (Array.isArray(this.#database[tabela])) {
      this.#database[tabela].push(dados);
    } else {
      this.#database[tabela] = [dados];
    }

    this.#persist();

    return dados;
  }

  update(tabela, id, dados) {
    const rowIndex = this.#database[tabela].findIndex(
      (linha) => linha.id === id
    );
    if (rowIndex > -1) {
      this.#database[tabela][rowIndex] = { id, ...dados };
      this.#persist;
    }
  }

  delete(tabela, id) {
    const rowIndex = this.#database[tabela].findIndex(
      (linha) => linha.id === id
    );
    if (rowIndex > -1) {
      this.#database[tabela].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
