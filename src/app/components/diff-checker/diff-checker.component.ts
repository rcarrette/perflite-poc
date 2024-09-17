import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

interface Difference {
  path: string;
  value1: any;
  value2: any;
}

@Component({
  selector: 'app-diff-checker',
  templateUrl: './diff-checker.component.html',
  styleUrls: ['./diff-checker.component.scss']
})
export class DiffCheckerComponent implements OnInit {

  ngOnInit(): void {
  }

  obj1 = {
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    }
  };

  obj2 = {
    name: 'Jane',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '12345'
    }
  };

  differences: Difference[] = [];

  constructor() {
    this.differences = this.getDifferentProperties(this.obj1, this.obj2);
  }

  getDifferentProperties(obj1: any, obj2: any, path = ''): Difference[] {
    const differences: Difference[] = [];

    function compareObjects(obj1: any, obj2: any, currentPath = '') {
      _.transform(obj1, (result: any, value: any, key: any) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        if (!_.isEqual(value, obj2[key])) {
          if (_.isObject(value) && _.isObject(obj2[key])) {
            compareObjects(value, obj2[key], fullPath);
          } else {
            differences.push({ path: fullPath, value1: value, value2: obj2[key] });
          }
        }
      }, {});

      // Check for keys that exist in obj2 but not in obj1
      _.transform(obj2, (result: any, value: any, key: any) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        if (!_.has(obj1, key)) {
          differences.push({ path: fullPath, value1: undefined, value2: value });
        }
      }, {});
    }

    compareObjects(obj1, obj2);
    
    return differences;
  }
}
