import { Request, Response, NextFunction } from 'express';
function isEmpty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}
function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}
function isBoolean(val) {
  return val === false || val === true;
}
function validate(config, req, res, next, value, element, arrayName) {
  if (config[element].string) {
    isString(req[value][element])
      ? console.log(`${element} is of string type`)
      : arrayName.push(config[element].errorMessage.typeError);
  }
  if (config[element].regex) {
    config[element].regex.test(req[value][element])
      ? console.log('Regex validation is right')
      : arrayName.push(config[element].errorMessage.regexError);
  }
  if (config[element].number) {
    (!isNaN(req[value][element]) && req[value][element] > 0 )
      ? (console.log(isNaN(req[value][element])),
        console.log(`${element} is of type number`),
        // tslint:disable-next-line: radix
        (req[value][element] = parseInt(req[value][element])))
      : arrayName.push(config[element].errorMessage.typeError);
  }
  if (config[element].isObject) {
    isObject(req[value][element])
      ? console.log(`${element} is of object type`)
      : arrayName.push(config[element].errorMessage.typeError);
  }
  if (config[element].boolean) {
    isBoolean(req[value][element])
      ? console.log(`${element} is of type`)
      : arrayName.push(config[element].errorMessage.typeError);
  }

  if (config[element].array) {
    const identify = config[element].array;
    if (Array.isArray(req[value][element])) {
      console.log(`element sholud not be type of ${identify}`);
    }
  }
}

export default function(config) {
  return (req: Request, res: Response, next: NextFunction) => {
    const arrayName = [];
    const getKeys = Object.keys(config);
    console.log(getKeys);
    getKeys.forEach(element => {
      console.log(element);
      config[element].in.map(value => {
        let inCount = 0;
        if (!isEmpty(req[value]) || !config[element].required) {
          console.log(config[element].required);
          if (!config[element].required) {
            if (!req[value][element]) {
              req[value][element] = config[element].default;
            } else {
              console.log(`${element} is there`);
              validate(config, req, res, next, value, element, arrayName);
            }
          } else {
            if (req[value][element]) {
              console.log(`${element} is there`);
              validate(config, req, res, next, value, element, arrayName);
            } else {
              arrayName.push(config[element].errorMessage.Error);
            }
          }
        } else {
          inCount++;
          if (inCount === config[element].in.length) {
            arrayName.push({
              error: `Please enter the data in any of the following: ${config[element].in}`,
              message: `Please enter the data in any of the following: ${config[element].in}`,
              timestamp: new Date(),
              status: 500
            });
          }
        }
      });
    });
    if (arrayName.length === 0) {
      next();
    } else {
      return next(arrayName);
    }
  };
}
