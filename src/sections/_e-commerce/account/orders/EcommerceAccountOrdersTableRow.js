import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Popover,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  InputBase,
} from '@mui/material';
//  utils
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersTableRow({ row, onSelectRow, selected }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const inputStyles = {
    pl: 1,
    '&.Mui-focused': {
      bgcolor: 'action.selected',
    },
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={row.orderId} sx={inputStyles} />
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={row.item} sx={inputStyles} />
        </TableCell>

        <TableCell>{fDate(row.deliveryDate)}</TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={fCurrency(row.price)} sx={inputStyles} />
        </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'Completed' && 'success') ||
              (row.status === 'To Process' && 'warning') ||
              (row.status === 'Cancelled' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { p: 1, width: 160 },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:view" sx={{ mr: 1 }} /> View
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Popover>
    </>
  );
}

EcommerceAccountOrdersTableRow.propTypes = {
  onSelectRow: PropTypes.func,
  row: PropTypes.shape({
    deliveryDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    item: PropTypes.string,
    orderId: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.string,
  }),
  selected: PropTypes.bool,
};
