jQuery(document).ready(function($) {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBx2QFmcm79K2dkyShsmZEV490KKtEMIYIrzG7HrxAw1Z5AxPFHzvoFhKNdOigjRnb7VAbrSpUPtII/pub?output=csv'; // Replace with your actual published CSV link

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;

      data.forEach(function(row) {
        if (!row["S.N."]) return; // Skip empty rows

        const tableRow = `
          <tr>
            <td>${row["S.N."]}</td>
            <td>${row["Letter No."]}</td>
            <td>${row["Date"]}</td>
            <td class="wrap-text">${row["Subject"]}</td>
            <td>${row["Button"]}</td>
          </tr>`;
        $('#csvTable tbody').append(tableRow);
      });

      $('#csvTable').DataTable({
        responsive: true,
        pageLength: 5,
        autoWidth: false,
        language: {
          searchPlaceholder: "Search...",
          search: ""
        },
        columnDefs: [
          { targets: '_all', className: 'dt-left' }
        ]
      });
    }
  });
});
