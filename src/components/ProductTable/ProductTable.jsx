import React from 'react';
import cn from 'classnames';
import { SORT_BY } from '../../constants/sortBy';
import ProductItem from '../ProductItem/ProductItem';

const ProductTable = ({ products, sortedColumn, setSortedColumn }) => {
  const sortClickHandler = (value) => {
    if (!sortedColumn) {
      setSortedColumn({
        sortBy: value,
        reverse: false,
      });
    } else {
      const { sortBy, reverse } = sortedColumn;

      if (value !== sortBy) {
        setSortedColumn({
          sortBy: value,
          reverse: false,
        });

        return false;
      }

      if (reverse) {
        setSortedColumn(null);

        return false;
      }

      setSortedColumn({
        ...sortedColumn,
        reverse: true,
      });

      return true;
    }

    return false;
  };

  return (
    <div className="box table-container">
      {!products.length && (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )}

      {Boolean(products.length) && (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  ID

                  <a
                    onClick={() => sortClickHandler(SORT_BY.ID)}
                    href="#/"
                  >
                    <span className="icon">
                      <i
                        data-cy="SortIcon"
                        className={
                        cn('fas', {
                          'fa-sort': sortedColumn?.sortBy !== SORT_BY.ID,
                          'fa-sort-up': sortedColumn?.sortBy === SORT_BY.ID
                            && !sortedColumn?.reverse,
                          'fa-sort-down': sortedColumn?.sortBy === SORT_BY.ID
                            && sortedColumn?.reverse,
                        })
                      }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Product

                  <a
                    onClick={() => sortClickHandler('name')}
                    href="#/"
                  >
                    <span className="icon">
                      <i
                        data-cy="SortIcon"
                        className={
                        cn('fas', {
                          'fa-sort': sortedColumn?.sortBy !== SORT_BY.NAME,
                          'fa-sort-up': sortedColumn?.sortBy === SORT_BY.NAME
                            && !sortedColumn?.reverse,
                          'fa-sort-down': sortedColumn?.sortBy === SORT_BY.NAME
                            && sortedColumn?.reverse,
                        })
                      }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Category

                  <a
                    onClick={() => sortClickHandler('category')}
                    href="#/"
                  >
                    <span className="icon">
                      <i
                        data-cy="SortIcon"
                        className={
                        cn('fas', {
                          'fa-sort': sortedColumn?.sortBy !== SORT_BY.CATEGORY,
                          'fa-sort-up':
                            sortedColumn?.sortBy === SORT_BY.CATEGORY
                            && !sortedColumn?.reverse,
                          'fa-sort-down':
                            sortedColumn?.sortBy === SORT_BY.CATEGORY
                            && sortedColumn?.reverse,
                        })
                      }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  User

                  <a
                    onClick={() => sortClickHandler('user')}
                    href="#/"
                  >
                    <span className="icon">
                      <i
                        data-cy="SortIcon"
                        className={
                        cn('fas', {
                          'fa-sort': sortedColumn?.sortBy !== SORT_BY.USER,
                          'fa-sort-up': sortedColumn?.sortBy === SORT_BY.USER
                            && !sortedColumn?.reverse,
                          'fa-sort-down': sortedColumn?.sortBy === SORT_BY.USER
                            && sortedColumn?.reverse,
                        })
                      }
                      />
                    </span>
                  </a>
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(item => (
              <ProductItem key={item.id} product={item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
