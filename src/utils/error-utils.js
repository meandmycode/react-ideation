export const createError = (code, message, etc) => {

    const error = new Error(`${code}: ${message}`);
    Object.assign(error, { ...etc, code });

    return error;

};
