type TagName = keyof HTMLElementTagNameMap;

export type TagWithText = {
  tagName: TagName;
  text: string;
};

export const SOURCE_CODE_TAGS: TagName[] = ['pre'];

export const getTagWithTextListByChildren = (
  parent: HTMLElement,
): TagWithText[] =>
  (Array.from(parent.children ?? []) as HTMLElement[]).map((elm) => ({
    tagName: elm.tagName.toLowerCase() as TagName,
    text: elm.innerText,
  }));

export const countCharacter = (
  tagWithTextList: TagWithText[],
  excludedTags: TagName[],
) =>
  tagWithTextList
    .filter(({ tagName }) => !excludedTags.includes(tagName))
    .reduce((acc, cur) => acc + cur.text.length, 0);
