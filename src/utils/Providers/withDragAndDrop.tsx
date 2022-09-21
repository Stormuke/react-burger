import type { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const withDragAndDrop = (component: () => FC) => () =>
  <DndProvider backend={HTML5Backend}>{component()}</DndProvider>;
