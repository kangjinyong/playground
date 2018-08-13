function newGuid() {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}

function gen(count) {
    let out = "";
    for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return out;
}

const empty = "00000000-0000-0000-0000-000000000000";

export const Guid = { empty, newGuid };