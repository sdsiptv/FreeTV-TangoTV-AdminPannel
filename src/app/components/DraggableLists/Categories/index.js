import React from 'react';
import { Grid } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CategoriesList({ categories, setCategories }) {
  const handleOnDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.index !== destination.index) {
      const newChannelCategories = Array.from(categories);
      const [removed] = newChannelCategories.splice(source.index, 1);
      newChannelCategories.splice(destination.index, 0, removed);
      setCategories(newChannelCategories);
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 8 * 2,
    margin: '0 0 8px 0',
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 300,
  });

  return (
    <Grid
      container
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {(provided, snapshot) => (
            <div
              style={getListStyle(snapshot.isDraggingOver)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categories.map(({ categoryId, categoryName }, index) => (
                <Draggable
                  key={categoryId}
                  draggableId={categoryId?.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      {categoryName}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
}

export default CategoriesList;
