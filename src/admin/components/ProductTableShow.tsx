/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Label,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  formatCurrencyProperty,
} from "@adminjs/design-system";
import { type BasePropertyProps } from "adminjs";
import React, { type FC } from "react";

import { type OrderItems } from "../handlers/order";

const ProductTableShow: FC<BasePropertyProps> = ({ record, property }) => {
  const items = record?.params.items as OrderItems;

  return (
    <Box>
      <Label variant="light">{property.label}</Label>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow>
              <TableCell>
                <Link href={`/admin/resources/Product/records/${item.productId}/show`}>
                  {item.product.name}
                </Link>
              </TableCell>
              <TableCell>{formatCurrencyProperty({ value: String(item.product.price) })}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {formatCurrencyProperty({ value: String(item.product.price * item.quantity) })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductTableShow;
