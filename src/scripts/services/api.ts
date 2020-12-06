import { ErrorObject } from "../helpers/ErrorObject";

const apiUrl = `http://localhost:6010`;

export class ArticlesAPI {
  public async fetchAllArticles(categories: string[]) {
    try {
      const res = await fetch(
        `${apiUrl}/articles?category=${categories.join(",")}`
      );

      if (res.status !== 200) {
        throw new Error("Something went wrong... Please try again.");
      }

      const data = await res.json();

      return data.articles;
    } catch (error) {
      new ErrorObject(error.message);
    }
  }
}
