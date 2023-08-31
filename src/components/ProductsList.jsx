import Products from '../api/products';
import Users from '../api/users';
import { Categorie } from './Categorie';

export const ProductsList = ({ categories }, { products }, { users }) => (
  <tr data-cy="Product">
    {products.map(product => (
      <Products product={product} key={product.id} />
    ))}
    {categories.map(categorie => (
      <Categorie categorie={categorie} key={categorie.id} />
    ))}
    {users.map(user => (
      <Users user={user} key={user.id} />
    ))}
  </tr>
);
