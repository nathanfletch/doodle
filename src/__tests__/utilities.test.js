import timeDifference from './../src/js/logic.js';

describe('timeDifference', () => {

  test('should return time since older timestamp', () => {
    //arrange
    const input = 1639463237424;
    const expected = "hi";
    //act
    const result = timeDifference(input);
    //assert
    expect(result).toEqual(expected);
  });

});