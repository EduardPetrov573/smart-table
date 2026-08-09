export function initFiltering(elements) {
    // заполнение выпадающих списков опциями — вызывается после получения индексов с сервера
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    // формирование параметров фильтрации для запроса
    const applyFiltering = (query, state, action) => {
        // #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;                     // какое поле очищаем
            action.parentElement.querySelector('input').value = ''; // сбрасываем поле ввода рядом с кнопкой
            state[field] = '';                                      // и то же самое в состоянии
        }

        // #4.5 — собрать параметры фильтрации
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {   // поля фильтра с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value;  // формируем в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;   // если что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}
