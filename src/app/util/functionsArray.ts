export class FunctionArray {
  static order(array: any[], fieldOrder: string): any[] {
    if (!array) { return []; }

    return array.sort((a, b) => {
      if (a[fieldOrder] < b[fieldOrder]) {
        return -1;
      }
      if (a[fieldOrder] > b[fieldOrder]) {
        return 1;
      }
      return 0;
    });
  }
}