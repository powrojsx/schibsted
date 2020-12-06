import { ArticlesAPI } from "scripts/services/api";

export interface IArticle {
  id: number;
  date: string;
  image: string;
  category: string;
  title: string;
  preamble: string;
}

export interface IState {
  filters: string[];
  articles: IArticle[];
  sortByDate: "asc" | "desc";
}

export interface IDOMElements {
  [k: string]: HTMLElement;
}

export interface IApp {
  state: IState;
  elements: IDOMElements;
  api: ArticlesAPI;
  setupListeners: () => void;
  changeFilter: (key: string) => (event: any) => void;
  setInitialUIState: () => void;
  toggleSortType: () => void;
  fetchArticles: () => void;
  renderArticles: () => void;
  fetchAndRenderArticles: () => void;
}
