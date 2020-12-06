import { formatDate, renderArticle, sortArticles } from "../utils";
import { getByDisplayValue, getByText, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

describe("formatDate tests", () => {
  test("should return formatted date", () => {
    const dateString = "13. oktober 2020";
    const result = formatDate(dateString);
    const expectedDate = new Date(2020, 9, 13);

    expect(result.toISOString()).toBe(expectedDate.toISOString());
  });
});

describe("sortArticles tests", () => {
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
      id: 123544,
      date: "1. oktober 2018",
      image: "https://placeimg.com/280/180/nature",
      category: "sport",
      title:
        "Solskjær fikk klar beskjed fra Røkke og Gjelsten: – Ikke kom tilbake!",
      preamble:
        "Ole Gunnar Solskjær forteller om den spesielle samtalen med de to Molde-investorene.",
    },
  ];

  test("should return sorted articles by date ascending", () => {
    const sortedArticles = sortArticles(articles, "asc");

    expect(formatDate(sortedArticles[0].date).getTime()).toBeLessThan(
      formatDate(sortedArticles[1].date).getTime()
    );
  });

  test("should return sorted articles by date descending", () => {
    const sortedArticles = sortArticles(articles, "desc");

    expect(formatDate(sortedArticles[0].date).getTime()).toBeGreaterThan(
      formatDate(sortedArticles[1].date).getTime()
    );
  });
});

describe("renderArticle", () => {
  const createDOM = () => {
    let body;
    body = document.createElement("body");
    body.innerHTML = `
        <template id="article-item">
          <li class="media mb-4">
              <figure class="media-left">
                  <p class="image is-128x128">
                      <img src="https://bulma.io/images/placeholders/128x128.png" alt="" class="js-image" />
                  </p>
              </figure>
              <div class="media-content">
                  <div class="content is-flex-desktop is-justify-content-space-between">
                      <h2 class="js-title subtitle">
                      </h2>
                      <p class="js-date is-size-6">
                      </p>
                  </div>
                  <div class="content is-hidden-mobile is-hidden-tablet-only">
                      <p class="js-content"></p>
                  </div>
              </div>
          </li>
      </template>
      <ul class="column is-12 is-8-desktop js-articles-list">
      </ul>
    `;

    document.body = body;
    return body;
  };

  afterEach(() => {
    document.body = document.createElement("body");
  });

  test("should render articles", async () => {
    const container = createDOM();
    const list = container.querySelector(".js-articles-list") as HTMLElement;

    renderArticle(
      {
        content: "test123",
        title: "Title123",
        imageUrl: "",
        date: "13. oktober 2020",
      },
      list
    );

    await waitFor(() => {
      expect(getByText(container, "test123")).toBeInTheDocument();
      expect(getByText(container, "Title123")).toBeInTheDocument();
      expect(getByText(container, "13. oktober 2020")).toBeInTheDocument();
    });
  });

  test("should display placeholder image when imageUrl is not provide", async () => {
    const container = createDOM();
    const list = container.querySelector(".js-articles-list") as HTMLElement;

    renderArticle(
      {
        content: "test123",
        title: "Title123",
        imageUrl: "",
        date: "13. oktober 2020",
      },
      list
    );

    await waitFor(() => {
      const imgElement = container.querySelector("img") as HTMLImageElement;
      expect(imgElement.src).toBe(
        "https://bulma.io/images/placeholders/128x128.png"
      );
    });
  });
});
