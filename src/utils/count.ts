type TagName = keyof HTMLElementTagNameMap;

export const CODE_TAGS: TagName[] = ['pre'];

export const countCharacterInChildElements = (
  rootElement: HTMLElement,
  excludedTags: TagName[],
) =>
  (Array.from(rootElement.children ?? []) as HTMLElement[])
    .map((elm) => ({
      tagName: elm.tagName.toLowerCase() as TagName,
      text: elm.innerText,
    }))
    .filter(({ tagName }) => !excludedTags.includes(tagName)) // 特定のタグを除く
    .reduce((acc, cur) => acc + cur.text.length, 0);
