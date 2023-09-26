"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSlug = exports.isValidUrl = void 0;
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return 'The value must be a valid url';
    }
};
exports.isValidUrl = isValidUrl;
const isValidSlug = (slug) => {
    const regex = /^[a-z-]+$/;
    if (regex.test(slug)) {
        return true;
    }
    else {
        return 'The value must contain only lowercase letters and hyphens';
    }
};
exports.isValidSlug = isValidSlug;
//# sourceMappingURL=validators.js.map