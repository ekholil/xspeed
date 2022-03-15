import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import makeData from "./data.json";
import { COLUMNS } from "./Columns";
import { Button, Table } from "react-bootstrap";
import {CgMathEqual} from 'react-icons/cg'
import {  useNavigate } from "react-router-dom";

const List = () => {
  const data = React.useMemo(() => makeData, []);
  const [records, setRecords] = React.useState(data);
  const columns = React.useMemo(() => COLUMNS, []);
  const getRowId = React.useCallback((row) => {
    return row.id;
  }, []);
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Update',
        Header: 'Update',
        Cell: ({ row }) => (
          <Button variant="success" onClick={() => navigate(`/update/${row?.id}`)}>
            Edit
          </Button>
        ),
      }
    ])
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      data: records,
      columns,
      getRowId,
    }, useSortBy, tableHooks);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const matched = data.filter(item => item?.name?.toLowerCase().includes(searchText?.toLowerCase()) || item?.id.toString().includes(searchText) || item?.created_at.toString().includes(searchText) )
    setRecords(matched)
  } 
  const navigate = useNavigate()
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
       <input className="container mt-4 mb-4 form-control" placeholder="Type to Search" type="text" onChange={handleSearch} />
       
      </div>
      <Table bordered hover className="text-center container" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th></th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <Row
                  index={index}
                  row={row}
                  moveRow={moveRow}
                  {...row.getRowProps()}
                />
              )
          )}
        </tbody>
      </Table>
    </DndProvider>
  );
};

const DND_ITEM_TYPE = "row";

const Row = ({ row, index, moveRow }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
     
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <tr ref={dropRef} style={{ opacity }}>
      <td ref={dragRef}> <CgMathEqual /> </td>
      {row.cells.map((cell) => {
        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
      })}
    </tr>
  );
};



export default List;
