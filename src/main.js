const data = window.data;
const home = document.getElementById('home');
const indicatorsP = document.getElementById('indicators-p');
const homePage = document.getElementById('home-page');
const indicatorsPage = document.getElementById('indicators-page');
const dataIndicatorsPage = document.getElementById('page-data-indicators');
const btnIndicators = document.getElementById("indicators");
const tablaDataIndicators = document.getElementById("tabla-data");
const tablaTotal = document.getElementById('dateTotal');
const grafico = document.getElementById("chart_div");
const grafico1 = document.getElementById("chart_div1");
const tablaEstadist = document.getElementById("tabla-estadist");
const orderDataBtn = document.getElementsByName("dataOrder");
const dataOrder = document.getElementById('dato-order')
const radTypeGraf = document.getElementById('style-graf')
const datosEstadisticos = document.getElementsByName("datosEstats");
const typeGraficos = document.getElementsByName('typeGrafico');

const navHome = document.getElementById("navHome");
const navEstadistico = document.getElementById("navEstadistico");

navHome.addEventListener('click', () => {
  navHome.classList.add('active');
  navEstadistico.classList.remove('active')
});

navEstadistico.addEventListener('click', () => {
  navEstadistico.classList.add('active');
  navHome.classList.remove('active')
});




for (let i = 0; i < datosEstadisticos.length; i++) {
  datosEstadisticos[i].addEventListener("change", () => {
    if (datosEstadisticos[i].value === 'Tabla General') {
      tablaTotal.classList.remove('hide')
      tablaTotal.classList.add('show')
      grafico1.classList.remove('show')
      grafico1.classList.add('hide')
      tablaEstadist.classList.remove('show')
      tablaEstadist.classList.add('hide')
      dataOrder.classList.remove('hide')
      dataOrder.classList.add('show')
      radTypeGraf.classList.remove('show')
      radTypeGraf.classList.add('hide')
    }
    else if (datosEstadisticos[i].value === 'Gráficos') {
      grafico1.classList.remove('hide')
      grafico1.classList.add('show')
      tablaEstadist.classList.remove('show')
      tablaEstadist.classList.add('hide')
      tablaTotal.classList.remove('show')
      tablaTotal.classList.add('hide')
      dataOrder.classList.remove('hide')
      dataOrder.classList.add('show')
      radTypeGraf.classList.remove('hide')
      radTypeGraf.classList.add('show')
    } else {
      grafico1.classList.remove('show')
      grafico1.classList.add('hide')
      tablaEstadist.classList.remove('hide')
      tablaEstadist.classList.add('show')
      tablaTotal.classList.remove('show')
      tablaTotal.classList.add('hide')
      dataOrder.classList.remove('show')
      dataOrder.classList.add('hide')
      radTypeGraf.classList.remove('show')
      radTypeGraf.classList.add('hide')
    }
  })
}



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
      let dataIndividual = "";
      const indicatorId = dato.id;
      // mostrar el nombre del indicador en la pagina 3
      const indicatorSelected = document.getElementById('paint-indicator');
      indicatorSelected.innerHTML = dato.textContent;
      returnIndicatorsData = window.worldBank.indicatorData(listFemIndicators, indicatorId);
      let myValor = [];
      for (let i in returnIndicatorsData) {
        if (returnIndicatorsData[i] !== "") {
          dataIndividual +=
            ` <tr><td> ${i} </td>
                <td>${ returnIndicatorsData[i].toFixed(2)}</td></tr>`;
          tablaDataIndicators.innerHTML = dataIndividual;
          myValor.push([i, returnIndicatorsData[i]]);
        }
      }

      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Años');
        data.addColumn('number', 'Porcentajes');
        data.addRows(myValor);

        const options = {
          'title': `${dato.textContent} `,
          titleTextStyle: {
            color: 'blue',
            fontName: 'Arial',
            fontSize: 16
          },
          chartArea: { left: '2px', top: '2px', right: '0.5px', width: "70%", height: "70%" },
          hAxis: { title: 'Años', titleTextStyle: { color: 'blue' } },
          vAxis: { title: 'Porcentajes', titleTextStyle: { color: 'blue' } },
          'width': '100%',
          'height': '410px',
          'colors': ['blue'],
          'backgroundColor': '#EFF2FB',
          series: [{ color: 'blue', visibleInLegend: false }],
          titlePosition: 'center',
          max: { color: 'red' },
          is3D: true
        };
        for (let i = 0; i < datosEstadisticos.length; i++) {
          datosEstadisticos[i].addEventListener("change", () => {
            if (datosEstadisticos[i].value === 'Gráficos') {
              const chart = new google.visualization.LineChart(grafico);
              chart.draw(data, options);
            }
          });
        }


        for (let i = 0; i < typeGraficos.length; i++) {
          typeGraficos[i].addEventListener("change", () => {// Instantiate and draw our chart, passing in some options.
            const chart = new google.visualization[typeGraficos[i].value](grafico);
            chart.draw(data, options);
          }
          )
        }
      }

      for (let i = 0; i < orderDataBtn.length; i++) {
        orderDataBtn[i].addEventListener("change", () => {
          tablaDataIndicators.innerHTML = "";
          grafico.innerHTML = "";
          const selectOrder = orderDataBtn[i].value;
          let returnOrderDataTable = window.worldBank.orderDataTable(returnIndicatorsData, selectOrder);
          let dataOrderIndividual = "";
          let myValorOrder = [];
          for (let value of returnOrderDataTable) {
            if (value[1] !== "") {
              dataOrderIndividual +=
                ` <tr><td> ${value[0]} </td>
                   <td>${ value[1].toFixed(2)}</td></tr>`;
              tablaDataIndicators.innerHTML = dataOrderIndividual;
              myValorOrder.push([value[0], value[1]]);
            }
          }

          google.charts.load('current', { 'packages': ['corechart'] });
          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Años');
            data.addColumn('number', 'Porcentajes');
            data.addRows(myValorOrder);

            const options = {
              'title': `${dato.textContent} `,
              titleTextStyle: {
                color: 'blue',
                fontName: 'Arial',
                fontSize: 16
              },
              chartArea: { left: '2px', top: '2px', right: '0.5px', width: "70%", height: "70%" },
              hAxis: { title: 'Años', titleTextStyle: { color: 'blue' } },
              vAxis: { title: 'Porcentajes', titleTextStyle: { color: 'blue' } },
              'width': '100%',
              'height': '400px',
              'colors': ['blue'],
              'backgroundColor': '#EFF2FB',
              series: [{ color: 'blue', visibleInLegend: false }],
              titlePosition: 'center',
              max: { color: 'red' },
              is3D: true
            };

    
            for (let i = 0; i < typeGraficos.length; i++) {
              typeGraficos[i].addEventListener("change", () => {
                const chart = new google.visualization[typeGraficos[i].value](grafico);
                chart.draw(data, options);
              }
              )
            }
          }
          // console.loh('order', dataIndividual)
        });
      }
      let arrayData = Object.values(returnIndicatorsData);
      let arrayFilterNumberData = arrayData.filter(Number);
      let minData = Math.min(...arrayFilterNumberData).toFixed(2);
      let maxData = Math.max(...arrayFilterNumberData).toFixed(2);
      let promData = window.worldBank.averageData(arrayFilterNumberData).toFixed(2);
      let statisticalTable =
        `<tr> <th scope="col">Datos estadisticos</th> <th scope="col">Valores %</th> </tr> 
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

///mi grafico//


