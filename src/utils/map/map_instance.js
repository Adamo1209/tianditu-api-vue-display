export const map_instance = {
    map: null,
    set(value) {
        this.map = value
    },
    get() {
        return this.map
    }
}