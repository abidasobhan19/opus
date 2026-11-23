import '../../styles/shop.css';
import { ShopShell } from '../../components/ShopShell';

export default function ShopLayout({ children }) {
  return <ShopShell>{children}</ShopShell>;
}