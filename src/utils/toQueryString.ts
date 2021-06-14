export default (map: Record<string, any>): string => {
    return Object.entries(map)
        .filter(([_, value]) => {
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            return !!value;
        })
        .map(entity => entity.join("="))
        .join("&");
};
