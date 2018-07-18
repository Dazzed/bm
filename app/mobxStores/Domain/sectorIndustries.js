import { observable, action, computed, toJS } from 'mobx';
import { getSectorIndustries } from '../../api';

import sector_props from '../../constants';

export default class SectorIndustries {

    @observable sectorData = null;

    @action setSectorData = (newData) => {
        this.sectorData = newData;
    }

    @observable selectedSectorOption = 0;

    @action selectSectorByOption = (selectedSectorValue) => {
      this.selectedSectorOption = selectedSectorValue;
      this.selectIndustryByOption(0);
      this.getIndustries()
    }

    @computed get selectedSectorJS() {
      if(!this.sectorData) {
        return null;
      } else {
        return toJS(this.sectorData)[this.selectedSectorOption - 1].sector;
      }
    }

    @computed get sectorDataJS() {
        if(!this.sectorData) {
            return [];
        } else {
            let formattedData = [{
              label: 'All',
              value: 0,
              queryString: 'all'
            }]
            toJS(this.sectorData).forEach((elem, i) => {
              const newVal = {
                label: elem.sector,
                value: i + 1,
                queryString: elem.sector
              }
              formattedData.push(newVal)
            })
            return formattedData;
        }
    }

    @observable sectorLoading = false;
    @action setSectorLoading = (newVal) => {
        this.sectorLoading = newVal;
    }

    @action getSectors = () => {
        this.setSectorLoading(true);
        let params = {
            filter: JSON.stringify({
              sector: 'all'
            })
        }
        getSectorIndustries(params)
        .then((res) => {
          console.log('======= get sector industries', res);
            if(res.ok) {
                this.setSectorData(res.json.data)
            } else {
            }
            this.setSectorLoading(false);
        })
        .catch((err) => {
            this.setSectorLoading(false);
        })
    }


    ///////////////////////////////////////
    ///////////////////////////////////////
    ///////////////////////////////////////
    ///////////////////////////////////////

    @observable industriesList = null;

    @observable selectedIndustryOption = 0;
    @action selectIndustryByOption = (newOption) => {
      this.selectedIndustryOption = newOption;
    }

    @computed get selectedIndustryJS() {
      console.log('=========== gettint selected industry', this.industriesListJS, this.selectedIndustryOption)
      if(!this.industriesList) {
        return null;
      } else {
        return this.industriesListJS[this.selectedIndustryOption].label;
      }
    }

    @action setIndustriesList = (newData) => {
        this.industriesList = newData;
    }

    @computed get industriesListJS() {
        if(!this.industriesList) {
            return [];
        } else {
            let formattedData = [{
              label: 'All',
              value: 0,
              queryString: 'all'
            }];
            toJS(this.industriesList).forEach((elem, i) => {
              formattedData.push({
                label: elem.industry,
                value: i + 1,
                queryString: elem.industry
              })
            })
            return formattedData;
        }
    }

    @observable industriesLoading = false;
    @action setIndustriesLoading = (newVal) => {
        this.industriesLoading = newVal;
    }

    @action getIndustries = () => {
      if(this.selectedSectorOption === 0) {
        this.setIndustriesList(null);
        return null;
      }

      this.setIndustriesLoading(true);
      let params = {
          filter: JSON.stringify({
            sector: this.selectedSectorJS
          })
      }

      console.log('============== GETTING INDUSTRY LISTTTTTTTT', this.selectedSectorJS, params)

      getSectorIndustries(params)
      .then((res) => {
        console.log('======= get industries list', res);
          if(res.ok) {
              this.setIndustriesList(res.json.data)
          } else {
          }
          this.setIndustriesLoading(false);
      })
      .catch((err) => {
          this.setIndustriesLoading(false);
      })
    }

}
