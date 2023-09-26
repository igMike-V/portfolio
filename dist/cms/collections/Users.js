"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email'
    },
    fields: [
        {
            name: 'avatar',
            label: 'Avatar',
            type: 'upload',
            relationTo: 'media'
        }
    ]
};
exports.default = Users;
//# sourceMappingURL=Users.js.map