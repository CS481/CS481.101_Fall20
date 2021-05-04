// We need our own runtime templating engine.
// I'm going to use the same format as a template literal.
// The values are passed as an object, and nested objects can be retrieved with ${name.subname}f syntax
// Does not support arrays right now. We may need to change that later
export default function FormatString(template, values) {
    let matches = [...template.matchAll(/\$\{(.*?)\}/g)];
    let result = template;
    for (let i in matches) {
        let match = matches[i];
        let value = findValue(match[1], values);
        result = result.replaceAll(match[0], value)
    }
    return result
}

function findValue(name, values) {
    let names = name.split(".");
    while (names.length > 1) {
        values = values[names[0]];
        names = names.slice(1);
    }
    return values[names[0]];
}