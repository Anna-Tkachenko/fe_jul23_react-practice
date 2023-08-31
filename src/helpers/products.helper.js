import { SORT_BY } from '../constants/sortBy';

export function getFilteredProducts(
  products,
  user,
  categories,
  search,
  sortedColumn,
) {
  let result = [...products];

  if (user) {
    result = result.filter(item => item.user.id === user);
  }

  if (categories.length) {
    result = result.filter(item => categories.includes(item.category.id));
  }

  if (search.trim()) {
    result = result.filter((item) => {
      const formattedName = item.name.toLowerCase();
      const formattedSearch = search.toLowerCase().trim();

      return formattedName.includes(formattedSearch);
    });
  }

  if (sortedColumn) {
    switch (sortedColumn.sortBy) {
      case SORT_BY.ID:
        result.sort();
        break;
      case SORT_BY.NAME:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SORT_BY.USER:
        result.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      case SORT_BY.CATEGORY:
        result.sort((a, b) => a.category.title.localeCompare(b.category.title));
        break;
      default:
        throw new Error('Something went wrong');
    }

    if (sortedColumn.reverse) {
      result = result.reverse();
    }
  }

  return result;
}
