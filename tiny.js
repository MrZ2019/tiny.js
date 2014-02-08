/*
* @license VOID by Shadow
* Languange: javascript
* library: tiny.js
* introduce: tiny.js has small code to help developer control there page, it isn't too large
*
* creata note:
* 2014.2.8  - created
* */

'use global'; // welcome me?

window.TINY = {
    libName: "tiny",
    introduce: "tiny.js created by shadow, now Feb 2014",
    createdDate: new Date(2014),
    author: "shadow",
    language: "javascript"
};

// here a seed for creation
window.TinySeed =
{
    extendList: ["extendTypeChecker", "extendHTMLElement", "extendHTMLElementWithCSS", "funcyPackage"],

    handy: true // if handy == ture, global space will added some variation for coding
};

// keeper for Tiny, use library's data storage, and others
window.TinyKeeper =
{
    APIs: {}, // storage api
    addAPI: function(memberAPI, optionName) {

        // set api's name
        optionName = optionName || memberAPI.name;

        // add api to Keeper
        TinyKeeper.APIs[optionName] = memberAPI;

        return this;
    }
};
// omit register...

// initial and extend
;(function() {

    // ## add short name

    var shortNames =
    {
        $: tiny,
        $1: get1
    };

    // call cover() to copy names to window

    cover(shortNames, window);

    // ## set a onload Handler

    on(function() {

        // - add some variation

        window.X = window.self;

        // use x instead of window

        X.head = $1("head");
        X.body = document.body;

        X.ALL = $("body > *");

    }, window, "load");

    // ## extend by seed

    var extList = TinySeed.extendList; // use a variation

    if(extList) {

        // There many string according a function, execute them
        for(var iExt = 0; iExt < extList.length; iExt++) {

            // call it on window
            var extFuncName;

            extFuncName = extList[iExt];

            window[extFuncName].call();
        }
    }
})();

function tiny() {

    // get arguments
    var args;

    args = arguments;

    var returnValue; // it's return value for this function

    // maybe array
    returnValue = new Array();

    // use for statement process each argument

    for(var iArg = 0; iArg < args.length; iArg++) {

        // get current argument
        var curArg;

        curArg = arguments[iArg];

        // get argument's type
        var argType = typeof(curArg);

        var curResult; // save a result

        switch(argType) {

            case "function":
            {
                curResult = on(curArg, window, "load");
            }
                break;

            case "string":
            {
                curResult = get(curArg);
            }
            // omit other type, "number", "boolean"...
        }

        // push result
        returnValue.push(curResult);
    }

    // if only have a item in array, dispose array
    if(returnValue.length == 1) {
        returnValue = returnValue[0];
    }

    return returnValue;
}

/*
on: use addEventListener() listen some event
 */

function on(handler, object, eventType, useCapture) {

    // set default object == window if not define
    object = object || window;

    if(typeof(eventType) == "undefined") {

        // if object == window, assign 'load'
        if(object == window) {
            eventType = "load";
        }
        else if(object instanceof HTMLElement){

            // it's HTMLElement
            eventType = "click";
        }
    }

    // add a Event Listener
    object.addEventListener(eventType, handler, useCapture);

    return object;
}

/*
get, get1: document{} has two api, querySelector, querySelectorAll, here use them, for get DOM Nodes
 */

function get(selectorText) {

    // use document.querySelectorAll api
    return document.querySelectorAll(selectorText);
}

function get1(selectorText) {

    // direct return result
    return document.querySelector(selectorText);
}

/*
cover: as copy, use for object member's opearte
 */
function cover(source, aim) {

    // default value for aim is window
    aim = aim || window;

    // use for..in
    for(var keyName in source) {

        // copy it
        aim[keyName] = source[keyName];
    }

    // return aim
    return aim;
}

/*
who: who() tell you a object's constructor, also be testor
 */
function who(object, instanceName) {

    var objInstance; // This variation save current object's instance

    var testInstance; // ==> Array, Error, it's an object

    if(typeof(instanceName) == "string") {
        instanceName = window[instanceName];
    }

    testInstance = instanceName;

    var whoResult;

    // if testInstance is defined, use instanceof operation
    if(testInstance) {
        whoResult = (object instanceof testInstance);
    }
    else {
        // may be have difference in some browser
        whoResult = object.constructor.name;
    }

    return whoResult;
}

/*
isset: isset() test value, as php 'isset' keyword
 */

function isset(value) {
    // two condition
    return ( (value !== null) && (value !== undefined) );
}

/*
unset: unset() looks unnecessary, only delete
 */
function unset(value) {
    delete value;
    // nice style
    return null;
}
/*
extendTypeChecker: use test type, or test instance, tow keyword in used: typeof and instanceof
 */

function extendTypeChecker() {

    // The map used in create class testor, other map omit...
    var shortClassMap =
    {
        _HE: HTMLElement,
        _A: Array,

        _E: Error // an Error
    };

    // -- create basic type checker, the first letter is uppercase

    var curType;

    var basicTypes = [ "Number", "Boolean", "String", "Function", "Object", "Undefined" ];

    for(var iType = 0; iType < basicTypes.length; iType++) {

        curType = basicTypes[iType];

        // no use return value, the assign operation in the function
        typeCheckerReturner(curType);
    }

    // create instanceChekcer, use shortName if handy set

    var shortName;

    for(shortName in shortClassMap) {

        curType = shortClassMap[shortName];

        // if not set handy, unset shortName, like php :)
        if(TinySeed.handy !== true) {
            shortName = unset(shortName); // shortName is null now
        }

        typeCheckerReturner(curType, shortName);
    }
    /*
    TypeCheckerReturner: it's a Returner use return a function, you know closure
     */

    function typeCheckerReturner(type, shortName) {

        // get what of type
        var typeName = typeof(type);

        var longName; // opposite to shortName
        var lowerName;

        if(typeName == "string") {

            longName = "is" + type; // maybe isNumber, isString
            lowerName = type.toLowerCase(); // use in function

            window[longName] = basicTypeChecker;

            // if handy is set, create a short alias
            if(TinySeed.handy == true) {

                // create shortName
                shortName = "_" + lowerName[0]; // same as _n (number), _s (string)

                window[shortName] = window[longName];
            }
        }
        else if(typeName == "function"){

            var instanceName;

            instanceName = type.name; // get instance Name

            longName = "is" + instanceName;

            // type exmaple as Array, Error
            window[longName] = objectInstanceChecker;

            if(isset(shortName)) {
                window[shortName] = window[longName]; // make a 'mirror'
            }
        }

        // return window[longName], althought not use
        return window[longName];

        /* basicTypeChecker: used for basic javascript check */

        function basicTypeChecker(thing) {
            return (typeof(thing) === lowerName); // if equal, return true, else false
        }

        /* ojbectInstanceChecker: javascript object has a constructor, so that Constructor has
        a member property called 'name', it's there Instance.
         */
        function objectInstanceChecker(object) {
            return (object instanceof type);
        }
    }
}
/*
extendHTMLElement: use prototype extend HTMLElement Class, so manuplate DOM will be handy
 */

function extendHTMLElement() {

    var HTMLElementAPIs =
    {
        // html use get or set DOM's html content, check content argment
        html: function(content) {

            // get content type
            var contentType = typeof(content);

            var htmlResult; // use function name declare a variation

            // use switch
            switch(contentType) {

                case "undefined": {
                    // get innerHTML
                    htmlResult = this.innerHTML;
                }
                case "string":
                {
                    // set HTML Content
                    this.innerHTML = content;
                    htmlResult = this;
                }
            }

            return htmlResult;
        },

        // set NODE's style, take 2 arguments
        css: function(styleName, styleValue) {

            var cssReturn; // return value

            // use window.getComputedStyle()
            var comStyle;

            comStyle = window.getComputedStyle(this);

            // test argument one, maybe its type is 'object'

            var arg1Type = typeof(styleName);

            // if arg1Type is 'object', into branch
            if(arg1Type == "object") {

                var arg1Obj = styleName; // a correct name

                if(arg1Obj instanceof Array) {

                    // it's values map
                    cssReturn = new Object();

                    // now get some pairs for css value

                    var iStyleName = 0;

                    for(;iStyleName < arg1Obj.length; iStyleName++) {

                        // in the for
                        styleName = arg1Obj[arg1Type];

                        // get style value from DOM's style propery
                        styleValue = comStyle[styleName];

                        cssReturn[styleName] = styleValue;
                    }
                }
                else {

                    // insure to set

                    for(styleName in arg1Obj) {

                        // get value
                        styleValue = arg1Obj[styleName];

                        // set value to DOM
                        this.style[styleName] = styleValue;

                        // return Element Self
                        cssReturn = this;
                    }
                }
            }
            else if(arg1Type == "string") {

                if(styleValue) {

                    // if styleValue indicate, set DOM style
                    this.style[styleName] = styleValue;

                    cssReturn = this;
                }
                else {
                    cssReturn = comStyle[styleName];
                }
            }

            return cssReturn;
        },
        // attr() set a HTMLElement's attribute value, similar css()
        attr: function(attrName, attrValue) {

            var attrResult;
            //argument 1 maybe other value type

            var arg1Type = typeof attrName;

            // usually a string as name
            if(arg1Type == "string") {

                // identify argument2
                if(attrValue) {

                    if(attrValue === null) {
                        // delete node's attribute
                        this.removeAttribute(attrName);
                    }
                    else {
                        // call setAttribute()
                        this.setAttribute(attrName, attrValue);
                    }

                    attrResult = this; // return node
                }
                else {

                    // if attrValue not set, return attrbute's value
                    attrResult = this.getAttribute(attrName);
                }
            }
            else if(arg1Type == "object") {

                var arg1Obj = attrName;

                // if argument1 is Array, execute get

                if(arg1Obj instanceof Array) {

                    attrResult = new Object(); // create object save values

                    for(var iAttrName = 0; iAttrName < arg1Obj.length; iAttrName++) {

                        attrName = arg1Obj[iAttrName];

                        // get current attribute's value
                        attrValue = this.getAttribute(attrName);

                        // add memeber
                        attrResult[attrName] = attrValue;
                    }
                }
                else {

                    // now set atrribute's value from object
                    for(attrName in arg1Obj) {

                        // get value, it's attribute
                        attrValue = arg1Obj[attrName];

                        // use setAttribuet() api

                        // also test 'null' for remove
                        if(attrValue !== null) {
                            this.setAttribute(attrName, attrValue);
                        }
                        else
                        {
                            this.removeAttribute(attrName);
                        }
                    }

                    // return Node self
                    attrResult = this;
                }
            }

            return attrResult;
        }
    };

    // get HTMLElement Prototype
    var HTMLProto = HTMLElement.prototype;

    // copy apis
    cover(HTMLElementAPIs, HTMLProto);

    // a step for NodeList, it's important to opearte multiple node

    TinyKeeper.HTMLAPISet = new Array();

    // push api with there name
    TinyKeeper.HTMLAPISet
        .push("html", "css", "attr");

    // then set a handler for onload event, use extend NodeList
    on(extendNodeList, window, "load");

    // add 'returnHTMLChanger' to keeper for use later
    TinyKeeper.addAPI(returnHTMLChanger);

    // now, expose a function to extend HTMLElemnt prototype quickly

    // first argument's type is unsure，the argument's name is boring
    window.extendHTML = function(extMode, arg1, arg2, arg3) {

        // get arg1's type
        var arg1Type = typeof arg1;

        var apiName, api;

        var HTMLProto = HTMLElement.prototype;

        // arg3 almost use set extend mode, both 'css' and 'attr'

        var extMode = extMode || "css"; // default 'css'
        // enter switch
        switch(arg1Type) {

            // - only take a api
            case "string":
            {
                apiName = arg1;

                HTMLProto[apiName] = returnHTMLChanger(extMode, arg2, arg3);

                // push api to set
                TinyKeeper.HTMLAPISet.push(apiName);
            }
                break;

            // - take multiple apis
            case "object":
            {
                var descSets = arg1;

                var curSet;
                var nameArray, defValues;
                // split object

                for(apiName in descSets) {

                    curSet = descSets[apiName];

                    // get pass arguments

                    nameArray = curSet[0];
                    if(! (nameArray instanceof Array)) {

                        // omit default values array
                        nameArray = curSet;
                    }
                    else {
                        defValues = curSet[1];
                    }
                    // done!
                    HTMLProto[apiName] = returnHTMLChanger(extMode, nameArray, defValues);

                    // push html api'name
                    TinyKeeper.HTMLAPISet.push(apiName);
                }
            }
                break;
        }
    }

    // a step to add api quickly
    var MostCSSAPIMap =
    {
        show: [["display"], ["block"]],
        hide: [["display"], ["none"]]
    };

    extendHTML("css", MostCSSAPIMap);

    // another step for attribute
    var NormalAttrAPIMap =
    {
        edit: [["contenteditable"], [""]]
    };

    extendHTML("attr", NormalAttrAPIMap);

    return HTMLElementAPIs;

    /* extendNodeList: add operator to NodeList's prototype, they are save in TinyKeeper */

    function extendNodeList() {

        var apiList = TinyKeeper.HTMLAPISet;

        var NLProto = NodeList.prototype; // NodeList's prototype

        for(var iApi = 0; iApi < apiList.length; iApi++) {

            var curApiName = apiList[iApi]; // api for DOM Element

            NLProto[curApiName] = NodeListAPIGetter(curApiName);
        }
        /* NodeListAPIGetter: get api saved in TinyKeeper, they will append to NodeList */

        function NodeListAPIGetter(apiName) {

            return NodeListAPI;
            /*
            NodeListAPI: change every Nodes in NodeSet, the way is call same name as api in them
             */

            function NodeListAPI() {

                var nodeCount, nodeIndex, curNode; // keep data

                nodeCount = this.length; // get total count in NodeList

                // iterate the NodeList
                for(nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {

                    curNode = this[nodeIndex];

                    // call api in node
                    curNode[apiName].apply(curNode, arguments);
                }

                return this;
            }
        }
    }

    /*
     returnHTMLChanger: add a api operatre a DOM Node's Style or Atrribute
     we can take parameter on multi format
     */
    function returnHTMLChanger(mode, arg1, arg2) {

        var nameArray, defValues;

        // set default mode == 'css'
        mode = mode || 'css'; // can use in 'this[mode]', the name is same

        // take type
        var arg1Type = typeof arg1;

        var thatName; // may be attrName or styleName
        var singleMode; // if true, the changer only modify a field

        if(arg1Type == "string") {
            thatName = arg1;
            singleMode = true;
        }
        else {
            nameArray = arg1;
            defValues = arg2 || []; // default is empty Array, block error
        }

        return HTMLChanger;

        /*
         HTMLChanger: change dom's style, take a argument
         */
        function HTMLChanger() {

            var A1, A2; // argument1, argument2

            var thatValue;

            if(singleMode == true) {
                A1 = thatName;

                // take a value
                A2 = arguments[0]
            }
            else {

                A1 = new Object();

                // compose values

                for(var iName = 0; iName < nameArray.length; iName++) {

                    thatName = nameArray[iName]; // get name

                    thatValue = arguments[iName];
                    if(typeof(thatValue) == "undefined") {
                        thatValue = defValues[iName] || ""; // default is empty string
                    }

                    // to A1, use later
                    A1[thatName] = thatValue;
                }
            }
            // the api not exist in original browser scope, it's tiny's component
            return this[mode].call(this, A1, A2);
        }
    }
}

/*
extendHTMLElementWithCSS: add some api to modify DOM's style, depend on 'extendHTMLElement', only css()
 */

function extendHTMLElementWithCSS() {

    var CSSStyleNameMap =
    {
        background: "bg", opacity: "opa", display: "disp", width: "W", height: "H", minWidth: "mW",

        color: "", fontSize: "fS", fontFamily: "fF", textAlign: "tA", lineHeight: "lH",

        position: "pos", top: "t", right: "r", bottom: "b", left: "l",

        margin: "m", marginTop: "mT",  marginRight: "mR", marginBottom: "mB",marginLeft: "mL",

        padding: "pad", paddingTop: "pT", paddingRight: "pR", paddingBottom: "pB", paddingLeft: "pL",

        cursor: "", overflow: "flow",

        border: "", borderRadius: "bRa", borderLeft: "bL", borderTop: "bT", borderRight: "bR", borderBottom: "bB",
        borderLeft: "bL", borderColor: "bC", borderStyle: "bS", borderWidth: "bW"
    };

    // get HTMLElement's prototype
    var HProto = HTMLElement.prototype;

    // use for in get every styleName

    for(var styleName in CSSStyleNameMap) {

        var shortName; // use if handy set

        shortName = CSSStyleNameMap[styleName];

        if(TinySeed.handy !== true) {
            shortName = "";
        }

        // append to HTMLElement's prototype

        HProto[styleName] = TinyKeeper.APIs.returnHTMLChanger("css", styleName);

        // save api to keeper
        TinyKeeper.HTMLAPISet.push(styleName);

        if(shortName !== "") {
            HProto[shortName] = HProto[styleName];

            // also save short case
            TinyKeeper.HTMLAPISet.push(shortName);
        }

    }
}
/* funcyPackage: The codes bring funcy and handy action to DOM :)
 */

function funcyPackage() {

    // - css parts

    var CSSMap =
    {
        huge: [["fontSize", "fontWeight", "fontFamily"], ["48px", "bold", "impact"]]
    };

    // only call a api
    extendHTML("css", CSSMap);
}