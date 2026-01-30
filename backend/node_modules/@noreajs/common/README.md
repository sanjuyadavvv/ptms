# Common tools for Norea.Js

The package include many functions that are used by the Norea.Js itself. Feel free to use them in your own applications or projects if you find them useful. This package does not have any dependencies.

[![Version](https://img.shields.io/npm/v/@noreajs/common.svg)](https://npmjs.org/package/@noreajs/common)

[![Downloads/week](https://img.shields.io/npm/dw/@noreajs/common.svg)](https://npmjs.org/package/@noreajs/common)

[![License](https://img.shields.io/npm/l/@noreajs/cli.svg)](https://github.com/noreajs/common/blob/master/package.json)

## Objects

### Obj.isObject

The _Obj.isObject_ method allows you to check if the given value is an object or not.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
Obj.isObject(data: any): boolean;
```

Method parameters

- **data**: Value to be checked

Example

```typescript
const value = Obj.isObject(undefined);
// false

const value = Obj.isObject(null);
// false

const value = Obj.isObject([]);
// false

const value = Obj.isObject({});
// true
```



### Obj.extend

The _Obj.extend_ method allows you to extend an object by :

- editing some values via filters
- omitting some keys
- adding prefix or suffix to key
- adding additional data.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
Obj.extend<T>(params: {
    data: any;
    filters?: {
        [key: string]: ((value: any) => any)[];
    } | undefined;
    keyPrefix?: string | undefined;
    keySuffix?: string | undefined;
    omits?: (keyof T)[] | undefined;
    additional?: {
        [key: string]: any;
    } | undefined;
}): any
```

Method parameters

- **params**: Parameters
  - **data**: object to be extended
  - **keyPrefix**: string to be added at the beginning of each key
  - **keySuffix**: string to be added at the end of each key
  - **filters**: To be applied on some key's value
  - **omits**: array of key of data to be omitted while extending.

Example

```typescript
const data = {
    first_name: "Arnold",
    middle_name: "langouo",
    last_name: "LAMBOU"
};

const extended = Obj.extend({
    data: data,
    keyPrefix: "person.",
    filters: {
        last_name: [
            (value) => {
                return `Mr ${value}`;
            }
        ]
    },
    omits: ["middle_name"]
});

// {
//     "person.first_name": "Arnold",
//     "person.last_name": "Mr LAMBOU"
// }
```

### Obj.flatten

The _Obj.flatten_ method allows you to flatten an object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
Obj.flatten: (params: {
    data: object;
    prefix?: string;
    suffix?: string;
    omits?: string[];
}) => any
```

Method parameters

- **params**: Parameters
  - **data**: object to be flattened
  - **prefix**: string to be added at the beginning of each key
  - **suffix**: string to be added at the end of each key
  - **omits**: array of key to be omitted while flattening the data. You can path (nested keys separated by dots).

Example

```typescript
const data = {
    country: {
        region: {
            city: {
                block: "Troy"
            }
        }
    }
};

const flattened = Obj.flatten({
    data: data,
    prefix: "world."
});

// {
//     "world.country.region.city.block": "Troy"
// }
```



### Obj.reverseFlatten

The _Obj.reverseFlatten_ method reverses the flattening process on an object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
Obj.reverseFlatten: (params: {
    data: object;
    prefix?: string;
    suffix?: string;
    omits?: string[];
	separator?: string | RegExp
}) => any
```

Method parameters

- **params**: Parameters
  - **data**: object to be flattened
  - **prefix**: string to be added at the beginning of each key
  - **suffix**: string to be added at the end of each key
  - **omits**: array of key to be omitted while flattening the data. You can path (nested keys separated by dots).
  - **separator**: string or regulation expression to split keys. the default value is `.`

Example

```typescript
const flattened = {
    "world.country.region.city.block": "Troy"
};

const reversed = Obj.reverseFlatten({
    data: data,
    prefix: "world."
});

// {
//     country: { region: { city: { block: "Troy"}}}
// }
```



### Obj.assignNestedProperty

The _Obj.assignNestedProperty_ method allows you to inject an attribute into an object no matter the level of nesting.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
const assignNestedProperty: (
  obj: any,
  keyPath: Array<string>,
  value: any
) => void;
```

Method parameters

- **obj**: object into which you want to inject the data
- **keyPath**: table containing in order each step of the path to the attribute
- **value**: value to assign

Example

```typescript
const user = {
  name: "John",
  email: "john-conor@sky.net",
};

Obj.assignNestedProperty(user, ["country", "city", "name"], "Newyork");

// New user value:
// {
// 	"name": "John",
// 	"email": "john-conor@sky.net",
// 	"country": {
// 		"city": {
// 			"name": "Newyork"
// 		}
// 	}
// }
```

### Obj.readNestedProperty

The _Obj.readNestedProperty_ method help you to read an attribute into an object no matter the level of nesting.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
const readNestedProperty: (obj: any, keyPath: Array<string>) => any;
```

Method parameters

- **obj**: the object that contains the valu
- **keyPath**: table containing in order each step of the path to the attribute

Example

```typescript
const user = {
	"name": "John",
	"email": "john-conor@sky.net",
	"country": {
		"name": "U.S.A"
		"city": {
			"name": "Newyork"
		}
	}
}

const cityName = Obj.readNestedProperty(user, ["country", "city", "name"]);
// Newyork

```

### Obj.merge & Obj.mergeStrict

The _Obj.merge_ method merges two objects by prioritizing either the attributes of the object on the left or the attributes of the object on the right.

In *strict* mode, the target replace as soon as the key exists in the priority object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function merge(left: any, right: any, priority?: "left" | "right"): any
function mergeStrict(left: any, right: any, priority?: "left" | "right"): any

// javascript
function merge(left, right, priority);
function mergeStrict(left, right, priority);
```

Method parameters

- **left**: left object
- **right**: right object
- **priority**: *left* (default value) or *right*

Example

```typescript
const obj = {
    id: 10,
    name: undefined,
    username: "matrix"
};

const obj2 = {
    name: "henry",
    username: undefined
};

const merged = Obj.merge(obj, obj2);
// { id: 10, name: "henry", username: "matrix" }

const mergedStrict = Obj.mergeStrict(obj, obj2);
// { id: 10, username: "matrix" }

const mergedWithRightPriority = Obj.merge(obj, obj2, "right");
// { id: 10, name: "henry", username: "matrix" }

const mergedWithRightPriorityStrict = Obj.mergeStrict(obj, obj2, "right");
// { id: 10, name: "henry" }
```



### Obj.mergeNested & Obj.mergeNestedStrict

The _Obj.mergeNested_ method merges two objects with nested properties by prioritizing either the attributes of the object on the left or the attributes of the object on the right.

In *strict* mode, the target replace as soon as the key exists in the priority object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function mergeNested(params: {left: any, right: any, priority?: "left" | "right", separator?: string}): any
function mergeNestedStrict(params: {left: any, right: any, priority?: "left" | "right", separator?: string}): any

// javascript
function mergeNested({left, right, priority, separator});
function mergeNestedStrict({left, right, priority, separator});
```

Method parameters

- **left**: left object
- **right**: right object
- **priority**: *left* (default value) or *right*
- **separator**: given objects are flattened before merged, and this separator is used in order to separate keys. The default value is `----`.

Example

```typescript
const obj = {
    id: 10,
    name: undefined,
	info: {
		first_name: "john",
    },
};

const obj2 = {
    name: "henry",
    info: {
        first_name: undefined
        last_name: "doe",
    }
};

const merged = Obj.mergeNested(obj, obj2);
// { id: 10, name: "henry", info: { first_name: "john", last_name: "doe"} }
const mergedStrict = Obj.mergeNestedStrict(obj, obj2);
// { id: 10, info: { first_name: "john", last_name: "doe"} }

const mergedWithRightPriority = Obj.merge(obj, obj2, "right");
// { id: 10, name: "henry", info: { first_name: "john", last_name: "doe"} }

const mergedWithRightPriorityStrict = Obj.mergeStrict(obj, obj2, "right");
// { id: 10, name: "henry", info: { last_name: "doe"} }
```



### Obj.missingKeys

The _Obj.missingKeys_ method returns the attributes of the given array that have not been filled in and the target object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function missingKeys<T, K = keyof T>(keys: K[], target: T): K[]

// javascript
function missingKeys(attrs, target);
```

Method parameters

- **attrs**: table of _target_'s required attributes
- **target**: object

Example

```typescript
const user = {
  name: "Lambou",
  nickname: "The Beast",
  jobTitle: "Big Food personal coach",
};

const keys = Obj.missingKeys(["name", "nickname"], user);
// []

const keys = Obj.missingKeys(["birthdate", "birthplace", "name"], user);
// ["birthdate", "birthplace"]
```

### Obj.pluck

The _Obj.pluck_ method extract a list of property values.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function pluck<T>(array: T[], key: keyof T): any[]

// javascript
function pluck(array, key);
```

Method parameters

- **array**: array of object
- **key**: key to be extracted

Example

```typescript
const users = [
    {
        id: 1,
        name: "Lambou",
    },
    {
        id: 2,
        name: "Arnold"
    }
];

const values = Obj.pluck(users, "id");
// [1, 2]

const values = Obj.pluck(users, "name");
// ["Lambou", "Arnold"]
```

### Obj.pluckNested

The _Obj.pluckNested_ method extract a list of property values.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function pluckNested(array: any[], keyPath: string | string[]): any[]

// javascript
function pluckNested(array, keyPath);
```

Method parameters

- **array**: array of object
- **keyPath**: key path of property to be extracted

Example

```typescript
const users = [
    {
        id: 1,
        name: "Lambou",
        info: {
            birth: "27-03-1995",
            birthplace: "Bangangté"
        }
    },
    {
        id: 2,
        name: "Arnold",
        info: {
            birth: "27-03-2000",
            birthplace: "Monaco"
        }
    }
];

const values = Obj.pluckNested(users, "id");
// [1, 2]

const values = Obj.pluckNested(users, "name");
// ["Lambou", "Arnold"]

const values = Obj.pluckNested(users, "info.birth");
// ["27-03-1995", "27-03-2000"]

const values = Obj.pluckNested(users, ["info", "birthplace"]);
// ["Bangangté", "Monaco"]
```

### Obj.clean

The _Obj.clean_ method remove null or undefined properties in an object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition (Typescript)

```typescript
function clean(obj: any, separator?: string | RegExp): any
```

Method definition (JavaScript)

```typescript
function clean(obj, separator): any
```

Method parameters

- **obj**: object
- **separator**: separator for nested properties

Example

```typescript
const data = {
    id: 10,
    name: "amina",
    size: null,
};
const r = Obj.clean(data);

// { id: 10, name: "amina" }

const data = {
    id: 10,
    name: "amina",
    size: null,
    age: undefined,
};
const r = Obj.clean(data);

// { id: 10, name: "amina" }
```



### Obj.cleanWithEmpty

The _Obj.cleanWithEmpty_ method remove null, undefined or empty string properties in an object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition (Typescript)

```typescript
function cleanWithEmpty(obj: any, separator?: string | RegExp): any
```

Method definition (JavaScript)

```typescript
function cleanWithEmpty(obj, separator): any
```

Method parameters

- **obj**: object
- **separator**: separator for nested properties

Example

```typescript
const data = {
    id: 10,
    name: "amina",
    size: null,
    lambou: ""
};
const r = Obj.cleanWithEmpty(data);

// { id: 10, name: "amina" }

const data = {
    id: 10,
    name: "amina",
    size: null,
    age: undefined,
    arnold: ''
};
const r = Obj.cleanWithEmpty(data);

// { id: 10, name: "amina" }
```


### Obj.cleanAll

The _Obj.cleanAll_ method remove null, undefined, empty string, empty array or false boolean properties in an object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition (Typescript)

```typescript
function cleanAll(obj: any, separator?: string | RegExp): any
```

Method definition (JavaScript)

```typescript
function cleanAll(obj, separator): any
```

Method parameters

- **obj**: object
- **separator**: separator for nested properties

Example

```typescript
const data = {
    id: 10,
    name: "amina",
    size: null,
    lambou: "",
    work: true,
    falsyValue: false,
    emptyArr: [],
    arr: ["hello"]
};
const r = Obj.cleanAll(data);

// { id: 10, name: "amina", work: true, arr: ["hello"] }
```



### Obj.undefinedToNull

The _Obj.undefinedToNull_ method turn all undefined properties of an object to null.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition (Typescript)

```typescript
function undefinedToNull(obj: any, separator?: string | RegExp): any
```

Method definition (JavaScript)

```typescript
function undefinedToNull(obj, separator): any
```

Method parameters

- **obj**: object
- **separator**: separator for nested properties

Example

```typescript
const data = {
    id: 10,
    name: "amina",
};
const r = Obj.undefinedToNull(data);

// { id: 10, name: "amina" }

const data = {
    size: null,
    age: undefined,
};
const r = Obj.undefinedToNull(data);

// { size: null, age: null }
```



## Arrays

### Arr.apply

The _Arr.apply_ method apply some filters to the given array. 

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition  (Typescript)

```typescript
function Arr.apply<T>(array: T[], filters: ((item: T) => any) | ((item: T) => any)[]): T[]
```

Method definition  (JavaScript)

```typescript
function Arr.apply(array, filters)
```

Method parameters

- **array**: array of string
- **filters**: method or array of methods

Examples

```typescript
const r = Arr.apply(["10", "20"], (value) => Number(value));
// [10, 20]

const r = Arr.apply(["a", "b"], (value) => `(${value})`);
// ["(a)", "(b)"]
```

### Arr.includes

The _Arr.includes_ method `true` if the array includes the given value and `false` otherwise. 

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition

```typescript
function includes(array: (string | number)[], value: string | number): boolean;
```

Method parameters

- **array**: array of string
- **value**: value

Examples

```typescript
const r = Arr.includes(["a", "b"], "c");
// false

const r = Arr.includes(["a", "b"], "a");
// true
```

### Arr.join

The _Arr.join_ method adds all the elements of an array separated by the specified glues string.

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition  (Typescript)

```typescript
function Arr.apply<T = any>(array: T[], glue: string; lastGlue?: string): string
```

Method definition  (JavaScript)

```typescript
function Arr.apply(array, glue, lastGlue)
```

Method parameters

- **array**: array of string
- **glue**: separator for the elements except the last
- **lastGlue**: separator for last element

Examples

```typescript
const str = Arr.join(["John", "Doe"], " ");
// John Doe

const str = Arr.join(["John", "Jane", "Paul"], ", ", " and ");
// John, Jane and Paul
```

### Arr.missing

The _Arr.missing_ method returns items in array **a** missing in array **b**. 

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition

```typescript
function missing(a: (string | number)[], b: (string | number)[]): (string | number)[];
```

Method parameters

- **a**: array of string
- **b**: array of string

Examples

```typescript
const r = Arr.missing(["a", "b"], ["c", "a"]);
// ["b"]

const r = Arr.missing(["a", "b"], ["a", "b"]);
// []
```

```typescript
const r = Arr.includes(["a", "b"], "c");
// false

const r = Arr.includes(["a", "b"], "a");
// true
```

### Arr.unique

The _Arr.unique_ method test the uniqueness of values of an array

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition (Typescript)

```typescript
function unique<T = any>(arr: Array<T>, keys?: string | keyof T | (string | keyof T)[] | undefined, separator?: string | RegExp): boolean
```

Method definition (JavaScript)

```js
function unique(arr, keys, separator): boolean
```

Method parameters

- **arr**: array
- **keys**: keys when it is an array of objects
- **separator**: separator for nested properties - default value " `.`"

Example

```typescript
const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "abena", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
];
const r = Arr.unique(data);
// true

const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "ayoho", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
];
const r = Arr.unique(data, "name");
// true

const data = [
      { name: "abena", id: 10, size: 1, info: { id: 1, profile: null } },
      { name: "ayoho", id: 1, size: 2, info: { id: 1, profile: null } },
      { name: "ateba", id: 2, size: 3, info: { id: 1, profile: null } },
      { name: "awana", id: 10, size: 4, info: { id: 1, profile: null } },
];
const r = Arr.unique(data, ["name", "id", "size"]);
// false
```

### Arr.distinct

The _Arr.distinct_ method eliminates duplicates in a table.

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition (Typescript)

```typescript
function distinct<T = any>(arr: Array<T>, keys?: string | keyof T | (string | keyof T)[] | undefined, separator?: string | RegExp): T[]
```

Method definition (JavaScript)

```typescript
function distinct(arr, keys, separator): any[]
```

Method parameters

- **arr**: array
- **keys**: keys when it is an array of objects
- **separator**: separator for nested properties - default value " `.`"

Examples

```typescript
const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "ayoho", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
];
const r = Arr.distinct(data, "id");

//	[
//		{ name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
//	]

const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "abena", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
];
const r = Arr.distinct(data);

//	[
//		{ name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
//		{ name: "abena", id: 10, size: 24, info: { id: 2, profile: null } },
//		{ name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
//		{ name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
//	]

const data = [
      { name: "abena", id: 10, size: 1, info: { id: 1, profile: null } },
      { name: "ayoho", id: 1, size: 2, info: { id: 1, profile: null } },
      { name: "ateba", id: 2, size: 3, info: { id: 1, profile: null } },
      { name: "awana", id: 10, size: 4, info: { id: 1, profile: null } },
];
const r = Arr.distinct(data, ["id", "info.id"]);

//	[
//	    { name: "abena", id: 10, size: 1, info: { id: 1, profile: null } },
//	    { name: "ayoho", id: 1, size: 2, info: { id: 1, profile: null } },
//	    { name: "ateba", id: 2, size: 3, info: { id: 1, profile: null } },
//	]
```



## Strings & Numbers

### extractLanguageTag

The _extractLanguageTag_ method help you to extract language tag in a locale string.

Method import

```typescript
import { extractLanguageTag } from "@noreajs/common";
```

Method definition

```typescript
const extractLanguageTag: (value: string | undefined) => string;
```

Method parameters

- **value**: locale value

Examples

```typescript
const tag = extractLanguageTag("en-US");
// en

const tag = extractLanguageTag("fr_FR");
// fr

const tag = extractLanguageTag("en");
// en
```

### forceNumber

The _forceNumber_ method returns the numeric value of the given object and zero if the given object is not a number

Method import

```typescript
import { forceNumber } from "@noreajs/common";
```

Method definition

```typescript
const forceNumber: (value: any) => number;
```

Method parameters

- **value**: potential number

Examples

```typescript
const num = forceNumber("100");
// 100

const num = forceNumber(150.2);
// 150.20

const num = forceNumber("en");
// 0

const num = forceNumber("454i");
// 0
```

### isFilled

The _isFilled_ method return **true** the given value is null or undefined.

Method import

```typescript
import { isFilled } from "@noreajs/common";
```

Method definition

```typescript
const isFilled: (value: any) => boolean;
```

Method parameters

- **value**: value to check

Examples

```typescript
var a = null;
var b = undefined;
var c = 10;
var d = {
  who: "Is it a question?",
  ofCourseYes: "Oh.. Ok me",
};

isFilled(a);
// false

isFilled(b);
// false

isFilled(c);
// true

isFilled(d);
// true
```

### isLocaleValid

The _isLocaleValid_ method return **true** the given value is a valid locale string.

Method import

```typescript
import { isLocaleValid } from "@noreajs/common";
```

Method definition

```typescript
const isLocaleValid: (locale?: string | undefined) => boolean;
```

Method parameters

- **value**: locale string

Examples

```typescript
var a = null;
var b = undefined;
var c = "en";
var d = "fr-FR";
var e = "en_US";

isLocaleValid(a);
// false

isLocaleValid(b);
// false

isLocaleValid(c);
// true

isLocaleValid(d);
// true

isLocaleValid(e);
// true
```

### isQueryParamFilled

The _isQueryParamFilled_ method return **true** the given value is null or undefined and length > 0.

Method import

```typescript
import { isQueryParamFilled } from "@noreajs/common";
```

Method definition

```typescript
const isQueryParamFilled: (value: any) => boolean;
```

Method parameters

- **value**: value to check

Examples

```typescript
var a = null;
var b = undefined;
var c = 10;
var d = "";

isQueryParamFilled(a);
// false

isQueryParamFilled(b);
// false

isQueryParamFilled(c);
// true

isQueryParamFilled(d);
// false
```

### removeAllWhiteSpaces

The _removeAllWhiteSpaces_ method remove all white spaces in string

Method import

```typescript
import { removeAllWhiteSpaces } from "@noreajs/common";
```

Method definition

```typescript
const removeAllWhiteSpaces: (
  value: string,
  replacement?: string | undefined
) => string;
```

Method parameters

- **value**: given string
- **replacement**: optional replacement value

Examples

```typescript
const value = removeAllWhiteSpaces("100 50");
// 10050

const value = removeAllWhiteSpaces("    hello!     world");
// hello!world

const value = removeAllWhiteSpaces("family member", " and ");
// family and member
```

### replaceAllMatch

The _replaceAllMatch_ method replace all occurences of a searched string in another string.

Method import

```typescript
import { replaceAllMatch } from "@noreajs/common";
```

Method definition

```typescript
const replaceAllMatch: (
  value: string,
  search: RegExp,
  replacement: string
) => string;
```

Method parameters

- **value**: given string
- **search**: regular expression
- **replacement**: replacement value

Examples

```typescript
const num = replaceAllMatch("100", /0/g, "1");
// 111

const num = replaceAllMatch("Live in America", /i/g, "I");
// LIve In AmerIca
```
