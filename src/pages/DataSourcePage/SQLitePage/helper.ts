const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'AGE', uid: 'age', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'TEAM', uid: 'team' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

export type NextjsUITableColumn = {
  name: string;
  uid: string;
  sortable?: boolean;
};

export type NextjsUITableDataItem = {
  id: number;
  [key: string]: any;
};

export const genColumnsViaData = (
  data: NextjsUITableDataItem,
  actionOptions?: {
    actions: {
      label: string;
      value: string;
      icon?: string;
    };
  }
): { column: NextjsUITableColumn[]; columnKeys: string[] } => {
  const columnKeys: string[] = [];
  const column = Object.keys(data).map((key) => {
    columnKeys.push(key);

    return {
      name: key,
      uid: key,
    };
  });

  column.push({ name: 'ACTIONS', uid: 'actions' });

  return { column, columnKeys };
};
