export const parseParamId = (param: string): number => {
    const id = parseInt(param, 10);

    return Number.isNaN(id) ? 0 : id;
}