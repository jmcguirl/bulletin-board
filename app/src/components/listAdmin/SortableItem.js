import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import EditAdmin from '../editAdmin';

import { userRoles } from '../../constants/userRoles';

const SortableItem = SortableElement(({ item, deleteUser, refreshList }) => {
  return (
    <div className="table-row">
      <div className="bulletin-email">{item.email}</div>
      <div className="bulletin-user-type">{item.role === userRoles.superAdmin ? 'Super Admin' : 'Admin'}</div>
      <div className="bulletin-actions">
        <EditAdmin item={item} refreshList={refreshList} />
        <i className="icon ion-md-trash" onClick={() => deleteUser(item.id)}></i>
      </div>
    </div>
  );
});

export default SortableItem;
