import { IArticle } from "./interfaces";

interface ArticleDTO {
  title: string;
  date: string;
  content: string;
  imageUrl: string;
}

const monthsMap: { [k: string]: number } = {
  januar: 0,
  februar: 1,
  mars: 2,
  april: 3,
  mai: 4,
  juni: 5,
  juli: 6,
  augusti: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

export const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split(" ");
  return new Date(Number(year), monthsMap[month], Number(day.slice(0, -1)));
};

export const sortArticles = (articles: IArticle[], type: "asc" | "desc") => {
  return articles.sort((a: IArticle, b: IArticle) => {
    if (type === "asc") {
      if (formatDate(a.date).getTime() > formatDate(b.date).getTime()) return 1;
      if (formatDate(a.date).getTime() < formatDate(b.date).getTime())
        return -1;

      return 0;
    }

    if (formatDate(a.date).getTime() < formatDate(b.date).getTime()) return 1;
    if (formatDate(a.date).getTime() > formatDate(b.date).getTime()) return -1;

    return 0;
  });
};

export function renderArticle(
  { content, date, title, imageUrl }: ArticleDTO,
  parentElement: HTMLElement
) {
  const template = document.querySelector<HTMLTemplateElement>("#article-item");

  if (!template) return;

  const element = document.importNode(template.content, true);

  (element.querySelector(".js-title") as HTMLElement).textContent = title;

  (element.querySelector(".js-date") as HTMLElement).textContent = date;

  (element.querySelector(".js-content") as HTMLElement).textContent = content;

  const imageEl = element.querySelector(".js-image") as HTMLImageElement;

  if (imageUrl) {
    imageEl.src = imageUrl;
  }

  parentElement.appendChild(element);
}
