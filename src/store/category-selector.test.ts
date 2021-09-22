import {categoryIdSelector} from './category-selector';

const testData = {
    categoriesIds: ['1', '2', '3', '4', '5'],
};

test('category-selector must be worked', () => {
    const result = categoryIdSelector.resultFunc(testData.categoriesIds);

    expect(result.length).toBe(5);
    expect(result[0]).toBe('1');
});
