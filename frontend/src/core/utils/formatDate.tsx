export const formatDate = (date: string) => {
    const dateBefore = new Date(date);
    return dateBefore.toLocaleDateString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric'
    }).replace(/,/g, '');
}