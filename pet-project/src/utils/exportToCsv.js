
const execute = (rows) => {
    let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_data.csv");
    document.body.appendChild(link);
    link.click();
}

function exportCsv() {
    return {
        execute
    }
}

export const exportToCsv = exportCsv()