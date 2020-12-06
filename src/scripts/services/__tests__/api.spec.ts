import { ArticlesAPI } from "../api";
import fetch from "jest-fetch-mock";

global.fetch = fetch;

describe("API service tests", () => {
  const articles = [
    {
      id: 789702,
      date: "2. februar 2019",
      image: "https://placeimg.com/280/180/nature",
      category: "sport",
      title:
        "Vålerengas førsterekke smadrer rivalene: - Seriegullet er I våre hender",
      preamble:
        "MERÅKER (VG) Finn-Hågen Krogh (28) opplevde den gedigne nedturen da han ble vraket til OL-sprinten i Sotsji etter at han først var tatt ut på laget. Nå føler han seg aldri trygg på å få starte i mesterskap.",
    },
    {
      id: 157489,
      date: "5. februar 2019",
      image: "https://placeimg.com/300/180/arch",
      category: "fashion",
      title: "Kongen stilte i Moon Boots: – Helt konge!",
      preamble: "Kong Harald (81) får moteskryt for spenstig skovalg.",
    },
  ];

  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should return all articles", async () => {
    const api = new ArticlesAPI();

    fetch.mockResponseOnce(JSON.stringify({ articles }));

    const result = await api.fetchAllArticles([]);

    expect(result).toEqual({ articles });
    expect(result.articles.length).toBe(2);
  });
});
