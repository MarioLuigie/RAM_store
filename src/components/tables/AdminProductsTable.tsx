import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/lib/types/products.types';
import { formatCurrency, formatId } from '@/lib/utils/utils';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/paths';
import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import { deleteProduct } from '@/lib/actions/product.actions';

export default function AdminProductsTable({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>
                {product.name}
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="flex-center gap-2">
                <Button asChild className="cursor-pointer" variant='outline'>
                  <Link href={`${ROUTES.ADMIN_PRODUCTS}/${product.id}`}>
                    Edit
                  </Link>
                </Button>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
