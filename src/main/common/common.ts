export const PaginationStateWithQuery = (objectQuery, searchField?, query?) => {
    if (searchField) return new URLSearchParams({ ...objectQuery, [searchField]: query }).toString().replace('%2C', ',');
    return new URLSearchParams({ ...objectQuery }).toString().replace('%2C', ',');
};