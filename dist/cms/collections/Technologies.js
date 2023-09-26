"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Technologies = {
    slug: 'technologies',
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            name: 'logo',
            label: 'Logo',
            type: 'upload',
            relationTo: 'media'
        }
    ]
};
exports.default = Technologies;
//# sourceMappingURL=Technologies.js.map