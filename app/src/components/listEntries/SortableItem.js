import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import DragHandle from './DragHandle';

import Toggle from '../toggle';
import EditEntry from '../editEntry';

const SortableItem = SortableElement(({ item, deleteBulletin, refreshList, toggleActive }) => {
  return (
    <div className="table-row">
      <div className="bulletin-drag-handle">
        <DragHandle />
      </div>
      <div className="bulletin-title">{item.title}</div>
      <div className="bulletin-owner">{item.owner}</div>
      <div className="bulletin-duration">{item.duration}s</div>
      <div className="bulletin-url">
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <span>{item.url}</span>
        </a>
      </div>
      <div className="bulletin-toggle">
        <Toggle active={item.activeStatus} toggleActive={() => toggleActive(item.id)} />
      </div>
      <div className="bulletin-actions">
        <EditEntry item={item} refreshList={refreshList} />
        <i className="icon ion-md-trash" onClick={() => deleteBulletin(item.id)}></i>
      </div>
    </div>
  );
});

export default SortableItem;
