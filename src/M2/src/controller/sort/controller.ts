import UserRepository from '../../../../M1/src/repositories/user/UserRepository';
import SystemResponse from '../../../../M1/src/libs/SystemResponse';
import { Request, Response, NextFunction } from 'express';

class SortedController {

  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): SortedController => {

    if (!SortedController.instance) {
      return SortedController.instance = new SortedController();
    }

    return SortedController.instance;

  }
  isEmpty = (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  swap = (arr, firstIndex, secondIndex) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  bubbleSort = (arr) => {

    const len = arr.length;
    let i;
    let j;
    let stop;

    for (i = 0; i < len; i++) {
      for (j = 0, stop = len - i; j < stop - 1; j++) {
        if ((arr[j + 1]) && (arr[j].localeCompare(arr[j + 1]) >= 0)) {
          this.swap(arr, j, j + 1);
        }
      }
    }

    return arr;
  }

  insertionSort = arr => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const element = arr[i];
      let j;
      for (j = i - 1; j >= 0 && (arr[j].localeCompare(element) >= 0); j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = element;
    }
    return arr;
  };

  selectionSort = (arr) => {
    const len = arr.length;
    let i;
    let j;
    for (i = 0; i < len - 1; i = i + 1) {
      let min = i;
      for (j = i + 1; j < len; j = j + 1) {
        if ((arr[j]) && (arr[j].localeCompare(arr[min]) <= 0)) {
          min = j;
        }
      }
      if (min !== i) {
        this.swap(arr, i, min);
      }
    }
    return arr;
  }

  merge = (left, right) => {
    const arr = [];
    while (left.length && right.length) {
      if ((left[0].localeCompare(right[0]) <= 0)) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }
    return arr.concat(left.slice().concat(right.slice()));
  }

  mergeSort = (arr) => {
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  adjust = (arr, object, bubbleSort) => {

    const temp = Object.keys(object);
    let i;
    let j;
    const newObj = {};
    let result;
    for (i = 0; i < arr.length; i++) {

      for (j = 0; j < arr.length; j++) {
        if (arr[i] === temp[j]) {
          if (typeof (object[temp[j]]) === 'object' && !Array.isArray(object[temp[j]])) {

            result = bubbleSort(Object.keys(object[temp[j]]));
            const tempObject = this.adjust(result, object[temp[j]], bubbleSort);
            newObj[arr[i]] = { ...tempObject };
          }
          else {
            newObj[arr[i]] = object[temp[j]];
          }
        }
      }
    }
    return newObj;

  };

  post = async (req: Request, res: Response,  next: NextFunction) => {
    try {
      let newObj;
      let id;
      const performance = require('performance-now');
      const { data, sortAlgorithm } = req.body;

      if (this.isEmpty(data)) {
        return next({
          error: 'Invalid Id',
          message: 'Invalid Id',
          timestamp: new Date(),
          status: 500
       });
      }

      switch (sortAlgorithm) {

        case 'Bubble Sort': {
          console.log('Bubble Sort');
          const start = performance();
          const result = this.bubbleSort(Object.keys(data.obj));
          newObj = this.adjust(result, data.obj, this.bubbleSort);
          id = data._id;
          const end = performance();
          res.send({ newObj, sortTime: (end - start), sortingAlgorithm: sortAlgorithm });
          break;
        }

        case 'Selection Sort': {
          console.log('Selection Sort');
          const start = performance();
          const result = this.selectionSort(Object.keys(data.obj));
          newObj = this.adjust(result, data.obj, this.selectionSort);
          id = data._id;
          const end = performance();
          res.send({ newObj, sortTime: (end - start), sortingAlgorithm: sortAlgorithm });
          break;
        }

        case 'Insertion Sort': {
          console.log('Insertion Sort');
          const start = performance();
          const result = this.insertionSort(Object.keys(data.obj));
          newObj = this.adjust(result, data.obj, this.insertionSort);
          id = data._id;
          const end = performance();
          res.send({ newObj, sortTime: (end - start), sortingAlgorithm: sortAlgorithm });
          break;
        }

        case 'Merge Sort': {
          console.log('MergeSort');
          const start = performance();
          const result = this.mergeSort(Object.keys(data.obj));
          newObj = this.adjust(result, data.obj, this.mergeSort);
          id = data._id;
          const end = performance();
          res.send({ newObj, sortTime: (end - start), sortingAlgorithm: sortAlgorithm });
          break;
        }

        default: {
          console.log('default');
          const start = performance();
          const result = this.mergeSort(Object.keys(data.obj));
          newObj = this.adjust(result, data.obj, this.mergeSort);
          id = data._id;
          const end = performance();
          res.send({ newObj, sortTime: (end - start), sortingAlgorithm: 'Merge Sort' });
        }

      }
    }
    catch (error) {
     throw error;
    }
  };

}
export default SortedController.getInstance();
