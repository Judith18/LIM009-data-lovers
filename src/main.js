const data = window.data;
const home = document.getElementById('home');
const indicatorsP = document.getElementById('indicators-p');
const homePage = document.getElementById('home-page');
const indicatorsPage = document.getElementById('indicators-page');
const dataIndicatorsPage = document.getElementById('page-data-indicators');
const btnIndicators = document.getElementById("indicators");
const tablaDataIndicators = document.getElementById("tabla-data");
const tablaEstadist = document.getElementById("tabla-estadist");
const orderDataBtn = document.getElementById("order-data-btn");

let pages = (pageToShow) => {
  [homePage, indicatorsPage, dataIndicatorsPage].forEach(page => {
    page.classList.add('hide');
    page.classList.remove('show')
  })
  pageToShow.classList.add('show');
  pageToShow.classList.remove('hide')
}

home.addEventListener('click', () => {
  pages(homePage);
});

indicatorsP.addEventListener('click', () => {
  pages(indicatorsPage);
});

btnIndicators.addEventListener('click', () => {
  const country = document.getElementById("country").value;
  const sector = document.getElementById("sector").value;
  let listIndicators = window.worldBank.filterDataCountries(data, country, sector);
  let listFemIndicators = '';
  // insertar el nombre de los sectores.
  const nameSector = document.getElementById('name-sector');
  nameSector.innerHTML = document.getElementById("sector").selectedOptions[0].text;
  const selectSector2 = document.getElementById('select-sector2');
  selectSector2.innerHTML = document.getElementById("sector").selectedOptions[0].text;
  const selectCountry2 = document.getElementById('select-country2');
  selectCountry2.innerHTML = document.getElementById('country').selectedOptions[0].text;
  if (sector === 'SH' || sector === 'SG') {
    listFemIndicators = listIndicators;
  } else {
    listFemIndicators = window.worldBank.filterFemIndicators(listIndicators);
  }
  let datos = '';
  for (let i = 0; i < listFemIndicators.length; i++) {
    datos += `<li id="${listFemIndicators[i].indicatorCode}" class="list">${listFemIndicators[i].indicatorName}.</li>`;
  }
  document.getElementById('list-indicator').innerHTML = datos;


  const datosList = document.querySelectorAll('li.list');
  let returnIndicatorsData;
  datosList.forEach(dato => {
    dato.addEventListener('click', () => {
      pages(dataIndicatorsPage);
      let dataIndividual="";
      const indicatorId = dato.id;
      // mostrar el nombre del indicador en la pagina 3
      const indicatorSelected = document.getElementById('paint-indicator');
      indicatorSelected.innerHTML = dato.textContent;
      returnIndicatorsData = window.worldBank.indicatorData(listFemIndicators, indicatorId);

      for (let i in returnIndicatorsData) {
        if (returnIndicatorsData[i] !== "") {
          dataIndividual +=
            ` <tr><td> ${i} </td>
                <td>${ returnIndicatorsData[i].toFixed(2)}</td></tr>`;
          tablaDataIndicators.innerHTML = dataIndividual;
        }
      }
      orderDataBtn.addEventListener('click', () => {
        tablaDataIndicators.innerHTML = "";
        const selectOrder = document.getElementById('select-order').value;
        let returnOrderDataTable = window.worldBank.orderDataTable(returnIndicatorsData, selectOrder);
        let dataOrderIndividual = "";
        for (let value of returnOrderDataTable) {
          if (value[1] !== "") {
            dataOrderIndividual +=
              ` <tr><td> ${value[0]} </td>
                   <td>${ value[1].toFixed(2)}</td></tr>`;
            tablaDataIndicators.innerHTML = dataOrderIndividual;
          }
        }
        // console.loh('order', dataIndividual)
      });
      let arrayData = Object.values(returnIndicatorsData);
      let arrayFilterNumberData = arrayData.filter(Number);
      let minData = Math.min(...arrayFilterNumberData).toFixed(2);
      let maxData = Math.max(...arrayFilterNumberData).toFixed(2);
      let promData = window.worldBank.averageData(arrayFilterNumberData).toFixed(2);
      let statisticalTable =
        `<tr> <th scope="col">Datos estadisticos</th> <th scope="col">Valores</th> </tr> 
         <tr> <td> Min. </td>
          <td>${minData}</td>
         </tr>
         <tr> <td> Max. </td>
          <td>${maxData}</td>
         </tr>
         <tr> <td> Promedio </td>
          <td>${promData}</td>
         </tr>`;
      tablaEstadist.innerHTML = statisticalTable;
    });
  });
});