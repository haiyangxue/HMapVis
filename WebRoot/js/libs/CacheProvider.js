/**
 * {Boolean} useLocalStorageIfAvailable - optional, defaults to true.  The CacheProvider object will 
 * use the HTML5 localStorage object, if available
 */
function CacheProvider(useLocalStorageIfAvailable) {
    // values will be stored here
    this._cache = {};
    
    this._useLocalStorage = 'undefined' == typeof(useLocalStorageIfAvailable) ? true : useLocalStorageIfAvailable;
}

try {
    CacheProvider.hasLocalStorage = ('localStorage' in window) && window['localStorage'] !== null;
} catch (ex) {
    CacheProvider.hasLocalStorage = false;
}

if (CacheProvider.hasLocalStorage) {
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.getObject = function(key) {
        return JSON.parse(this.getItem(key));
    };
}

CacheProvider.prototype = {

    /**
     * {String} k - the key
     */
    get: function(k) {
        if (this._useLocalStorage && CacheProvider.hasLocalStorage) {
            var isObject = localStorage.getItem(k + '___isObject');
            var action = isObject ? 'getObject' : 'getItem';
            return localStorage[action](k) || undefined;
        } else {
            return this._cache[k] || undefined;
        }
    },

    /**
     * {String} k - the key
     * {Object} v - any kind of value you want to store
     */
    set: function(k, v) {
        if (this._useLocalStorage && CacheProvider.hasLocalStorage) {
            if (typeof v !== 'string') {
                // make assumption if it's not a string, then we're storing an object
                localStorage.setObject(k, v);                
                localStorage.setItem(k + '___isObject', true);
            } else {
                try {
                    localStorage.setItem(k, v);
                } catch (ex) {
                    if (ex.name == 'QUOTA_EXCEEDED_ERR') {
                        // developer needs to figure out what to start invalidating
                        throw new Exception(v);
                        return;
                    }
                }
            }
        } else {
            // put in our local object
            this._cache[k] = v;
        }
        // return our newly cached item
        return v;
    },

    /**
     * {String} k - the key
     * {Boolean} local - put this in local storage
     */
    clear: function(k) {
        if (this._useLocalStorage && CacheProvider.hasLocalStorage) {
            localStorage.removeItem(k);
            localStorage.removeItem(k + '___isObject');
        }
        // delete in both caches - doesn't hurt.
        delete this._cache[k];
    }
};

/** Usage
var cache = new CacheProvider();

// a complex object to test object caching
var obj1 = { 
    dogs: [
        'fido',
        'rufus'
    ],
    owner: {
        name: 'arod'
    }
};

cache.set('key1', obj1);
    var obj2 = cache.get('key1');                     
console.log(obj2);

cache.set('key2', 'asdfasdfasdfd');
var obj3 = cache.get('key2');
console.log(obj3);

cache.clear('key1');
cache.clear('key2');
*/