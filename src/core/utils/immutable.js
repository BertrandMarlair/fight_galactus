export const updateArray = (array, newItem, atIndex) => {
    return array.map((item, index) => (index === atIndex ? newItem : item));
};

export const updateArrayMutipleItem = (array, newItem, atIndexNew, oldItem, atIndexOld) => {
    return array.map((item, index) => {
        if (index === atIndexNew) {
            return newItem;
        } else if (index === atIndexOld) {
            return oldItem;
        }
        return item;
    });
};
