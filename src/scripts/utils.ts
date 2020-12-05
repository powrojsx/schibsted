interface Article {
  title: string;
  date: Date;
  content: string;
}

export function createArticleElement({ content, date, title }: Article) {
  const template = document.querySelector<HTMLTemplateElement>("#article-item");

  if (!template) return;

  const element = document.importNode(template.content, true);

  (element.querySelector(".js-title") as HTMLElement).textContent = title;

  (element.querySelector(
    ".js-date"
  ) as HTMLElement).textContent = date.toLocaleDateString();

  (element.querySelector(".js-content") as HTMLElement).textContent = content;

  return element;
}
