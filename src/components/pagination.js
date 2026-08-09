import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);   // берём первый элемент как шаблон
    pages.firstElementChild.remove();                               // и удаляем его из контейнера

    let pageCount;  // запоминаем количество страниц с последней отрисовки — нужно для действия last

    // формирование параметров пагинации до запроса данных
    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // #2.6 — обработать действия
        if (action) switch (action.name) {
            case 'prev': page = Math.max(1, page - 1); break;           // предыдущая страница
            case 'next': page = Math.min(pageCount, page + 1); break;   // следующая страница
            case 'first': page = 1; break;                              // первая страница
            case 'last': page = pageCount; break;                       // последняя страница
        }

        return Object.assign({}, query, {   // добавим параметры к query, но не изменяем исходный объект
            limit,
            page
        });
    }

    // перерисовка пагинатора после получения данных
    const updatePagination = (total, {page, limit}) => {
        pageCount = Math.ceil(total / limit);

        // #2.4 — получить список видимых страниц и вывести их
        const visiblePages = getPages(page, pageCount, 5);          // показываем не более 5 страниц
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }))

        // #2.5 — обновить статус пагинации
        fromRow.textContent = (page - 1) * limit + 1;           // с какой строки выводим
        toRow.textContent = Math.min((page * limit), total);    // до какой строки выводим
        totalRows.textContent = total;                          // сколько всего строк
    }

    return {
        updatePagination,
        applyPagination
    };
}
