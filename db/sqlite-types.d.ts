declare module "expo-sqlite" {
  export interface SQLResultSet {
    insertId?: number;
    rowsAffected: number;
    rows: {
      length: number;
      item: (index: number) => any;
      _array: any[];
    };
  }

  export interface SQLTransaction {
    executeSql(
      sqlStatement: string,
      args?: any[],
      callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
      errorCallback?: (
        transaction: SQLTransaction,
        error: any
      ) => boolean | void
    ): void;
  }

  export interface WebSQLDatabase {
    transaction(
      callback: (tx: SQLTransaction) => void,
      errorCallback?: (error: any) => void,
      successCallback?: () => void
    ): void;
  }

  export function openDatabase(name: string): WebSQLDatabase;
}
