window.worldBank = {
  filterDataCountries: (data, country, sector) => {
    const sectorCodeCountries = (data[country].indicators);//Permite ingresar a la propiedad de país, para luego entrar a la propiedad indicators que contieneuna array//
    const arrSectorCodeIndicator = sectorCodeCountries.filter(objSector => {//filtra segun el indicatorCode//
      const sectorCode = objSector.indicatorCode.startsWith(sector);//Filtra  por las dos primeras iniciales//
      return sectorCode;
    });
    return arrSectorCodeIndicator;
  },

  filterFemIndicators: (data) => {
    const genFem = data.filter(filterFem => {
      const arrFemSector = filterFem.indicatorCode.includes('.FE');//hace una búsqueda dentro del strings//
      return arrFemSector;
    });
    return genFem;
  },

  indicatorData: (listFemIndicators, indicatorId) => {
    let obj;
    for (let i = 0; i < listFemIndicators.length; i++) {
      if (listFemIndicators[i].indicatorCode === indicatorId) {
        obj = listFemIndicators[i].data;
      }
    }
    return obj;
  },

  orderDataTable: (data, order) => {
    const arrayData = Object.entries(data);
    let arrData = [];
    if (order === 'asc') {
      arrData = arrayData.concat().sort((prev, next) => {//concat copia la data para que no mute//
        return prev[1] - next[1];
      });
    } else {
      arrData = arrayData.concat().sort((prev, next) => {
        return next[1] - prev[1];
      });
    }
    return arrData;
  },

  averageData: (arrData) => { // Función para calcular el promedio
    let sum = arrData.reduce((previous, current) => previous + current);
    let avgDat = sum / arrData.length;
    return avgDat;
  },
};
