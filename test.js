const index = import("./index.js")

index.then(({ default: defaultFunction, foo }) => { defaultFunction(); foo(); })