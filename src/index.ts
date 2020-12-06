import "./styles/index.scss";
import { renderArticle, sortArticles } from "./scripts/utils";
import { ArticlesAPI } from "./scripts/services/api";
import { IApp, IArticle, IDOMElements, IState } from "./scripts/interfaces";

class App implements IApp {
  state: IState = {
    filters: ["sport"],
    articles: [],
    sortByDate: "desc",
  };

  elements: IDOMElements = {
    articlesList: document.querySelector(".js-articles-list") as HTMLElement,
    sportFilters: document.querySelector("#sport-filter") as HTMLElement,
    fashionFilters: document.querySelector("#fashion-filter") as HTMLElement,
    sortByDateBtn: document.querySelector(".js-sort-by-date") as HTMLElement,
  };

  api = new ArticlesAPI();

  init = () => {
    this.setupListeners();
    this.setInitialUIState();
    this.fetchAndRenderArticles();
  };

  changeFilter = (key: string) => (event: any) => {
    if (!event.target.checked) {
      this.state.filters = this.state.filters.filter((item) => item !== key);
    } else {
      this.state.filters.push(key);
    }

    this.fetchAndRenderArticles();
  };

  setupListeners = () => {
    this.elements.sportFilters.addEventListener(
      "change",
      this.changeFilter("sport")
    );

    this.elements.fashionFilters.addEventListener(
      "change",
      this.changeFilter("fashion")
    );

    this.elements.sortByDateBtn.addEventListener("click", this.toggleSortType);
  };

  setInitialUIState = () => {
    if (this.state.filters.includes("sport")) {
      (this.elements.sportFilters as HTMLInputElement).checked = true;
    }

    if (this.state.filters.includes("fashion")) {
      (this.elements.fashionFilters as HTMLInputElement).checked = true;
    }

    if (this.state.sortByDate === "asc") {
      this.elements.sortByDateBtn.classList.add("date-button--asc");
    }
  };

  toggleSortType = () => {
    if (this.state.sortByDate === "asc") {
      this.state.sortByDate = "desc";
      this.elements.sortByDateBtn.classList.remove("date-button--asc");
    } else {
      this.state.sortByDate = "asc";
      this.elements.sortByDateBtn.classList.add("date-button--asc");
    }

    this.renderArticles();
  };

  fetchArticles = async () => {
    const { articles } = await this.api.fetchAllArticles(this.state.filters);
    this.state.articles = articles;
  };

  renderArticles = () => {
    this.elements.articlesList.innerHTML = "";

    sortArticles(this.state.articles, this.state.sortByDate).forEach(
      (article: IArticle) =>
        renderArticle(
          {
            title: article.title,
            date: article.date,
            content: article.preamble,
            imageUrl: article.image,
          },
          this.elements.articlesList as HTMLElement
        )
    );
  };

  fetchAndRenderArticles = () => {
    this.fetchArticles().then(() => {
      this.renderArticles();
    });
  };
}

new App().init();
