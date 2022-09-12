import { countCharacter, TagWithText, SOURCE_CODE_TAGS } from './count';

const createText = (n: number) =>
  Array.from({ length: n })
    .map(() => 'z')
    .join('');

describe('utils/count', () => {
  describe('countCharacter', () => {
    const TEST_DATA: TagWithText[] = [
      { tagName: 'pre', text: createText(100) },
      { tagName: 'h1', text: createText(1) },
      { tagName: 'h2', text: createText(2) },
      { tagName: 'h3', text: createText(3) },
    ];
    it('全てのタグの文字数を合算して返却する', () => {
      expect(countCharacter(TEST_DATA, [])).toBe(106);
    });
    it('h2のタグを除いた文字数を合算して返却する', () => {
      expect(countCharacter(TEST_DATA, ['h2'])).toBe(104);
    });
    it('"SOURCE_CODE_TAGS"に含まれるタグを除いた合算を返却する', () => {
      expect(countCharacter(TEST_DATA, SOURCE_CODE_TAGS)).toBe(
        TEST_DATA.filter(
          ({ tagName }) => !SOURCE_CODE_TAGS.includes(tagName),
        ).reduce((acc, { text }) => acc + text.length, 0),
      );
    });
  });
});
