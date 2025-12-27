
export function validateInput(data) {
    const { first_name, last_name, address } = data;
    if (!first_name || !last_name || !address) {
        return false;
    }
    return true;
}