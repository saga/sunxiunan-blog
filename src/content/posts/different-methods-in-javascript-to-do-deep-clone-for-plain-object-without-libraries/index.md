---
title: Different methods in JavaScript to do deep clone for plain object without libraries
description: "1, use JSON.parse and JSON.stringify, but it has many i &hellip; \n继续阅读“Different methods in JavaScript to do deep clone for plain object without libraries”"
published: 2019-12-12
category: blog
---

1, use JSON.parse and JSON.stringify, but it has many issues, major one is can’t handle Date type.

`var cloned = JSON.parse(JSON.stringify(objectToClone));`

2, refer to this, mainly ideas is loop the properties one by one, and go into children, also need to handle ‘Function’, ‘Symbol’, ‘WeakSet’, etc. all possible data types in JavaScript :

> [https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)

```
function clone(obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    if (obj instanceof Date)
        var temp = new obj.constructor(); //or new Date(obj);
    else
        var temp = obj.constructor();

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}
```

also there are more examples could refer to, for example this version needs ES6 supports [https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references](https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references)

```
function deepClone(obj, hash = new WeakMap()) {
    // Do not try to clone primitives or functions
    if (Object(obj) !== obj || obj instanceof Function) return obj;
    if (hash.has(obj)) return hash.get(obj); // Cyclic reference
    try { // Try to run constructor (without arguments, as we don't know them)
        var result = new obj.constructor();
    } catch(e) { // Constructor failed, create object without running the constructor
        result = Object.create(Object.getPrototypeOf(obj));
    }
    // Optional: support for some standard constructors (extend as desired)
    if (obj instanceof Map)
        Array.from(obj, ([key, val]) => result.set(deepClone(key, hash), 
                                                   deepClone(val, hash)) );
    else if (obj instanceof Set)
        Array.from(obj, (key) => result.add(deepClone(key, hash)) );
    // Register in hash    
    hash.set(obj, result);
    // Clone and assign enumerable own properties recursively
    return Object.assign(result, ...Object.keys(obj).map (
        key => ({ [key]: deepClone(obj[key], hash) }) ));
}
```

Anyway, I recommend to use JavaScript library ‘**clone**‘ for the deep clone, it could handle **circular reference** correctly.

If you need to create more complex feature to re-create (serialization) new instance from source object or JSON string (and use TypeScript), I prefer to use this [**https://github.com/typestack/class-transformer**](https://github.com/typestack/class-transformer) The ‘class-transformer’ doesn’t force you to describe the class with decorator (of course you could do it, and have to if you need rich features), it is good point I prefer to.
