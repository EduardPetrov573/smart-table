import {sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // #3.1 — запомнить выбранный режим сортировки
            action.dataset.value = sortMap[action.dataset.value];   // следующее состояние из карты переходов
            field = action.dataset.field;                           // поле, по которому сортируем
            order = action.dataset.value;                           // направление сортировки

            // #3.2 — сбросить сортировки остальных колонок
            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        } else {
            // #3.3 — получить выбранный режим сортировки
            columns.forEach(column => {
                if (column.dataset.value !== 'none') {
                    field = column.dataset.field;
                    order = column.dataset.value;
                }
            });
        }

        const sort = (field && order !== 'none') ? `${field}:${order}` : null;  // параметр сортировки в виде field:direction

        return sort ? Object.assign({}, query, {sort}) : query;   // если есть сортировка — добавляем, иначе не трогаем query
    }
}
