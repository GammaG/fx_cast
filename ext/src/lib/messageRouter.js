"use strict";

const routeMap = new Map();


function register (routeName, senderCallback) {
    routeMap.set(routeName, senderCallback);
}

function deregister (routeName) {
    routeMap.delete(routeName);
}

function handleMessage (message, details) {
    const destination = message.subject.split(":")[0];
    if (routeMap.has(destination)) {
        routeMap.get(destination)(message, details);
    }
}

export default {
    register
  , deregister
  , handleMessage
}
