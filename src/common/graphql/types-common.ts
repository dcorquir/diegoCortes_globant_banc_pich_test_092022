import { objectType,  } from "nexus";

export const responseCode = objectType({
    name: "ResponseCode",
    description: "Description AuthInput",
    definition(t) {
        t.nonNull.string("code");
        t.nonNull.string("message");
        t.nonNull.string("level");
        t.nonNull.string("description");
    },
});
