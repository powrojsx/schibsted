const apiUrl = `http://localhost:6010`;

export class ArticlesAPI {
  public async fetchAllArticles(categories: string[]) {
    try {
      return await fetch(
        `${apiUrl}/articles?category=${categories.join(",")}`
      ).then((res) => res.json());
    } catch (error) {
      throw new Error(error);
    }
  }
}
