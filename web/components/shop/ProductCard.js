import Link from 'next/link';
import { kr } from '../../lib/money';
import { ProductArt, artTone } from '../ProductArt';

export function ProductCard({ product }) {
  return (
    <Link className="pcard" href={'/product/' + product.id}>
      <div className={'imgwrap ' + artTone(product.art)}>
        <ProductArt art={product.art} title={product.name} />
      </div>
      <div className="cat">{product.category}</div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">{kr(product.price)}</div>
    </Link>
  );
}
