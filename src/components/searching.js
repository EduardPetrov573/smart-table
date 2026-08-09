export function initSearching(searchField) {
    return (query, state, action) => {
        return state[searchField] ? Object.assign({}, query, {   // проверяем, что в поле поиска было что-то введено
            search: state[searchField]                           // устанавливаем в query параметр
        }) : query;                                              // если поле пустое, возвращаем query без изменений
    }
}
