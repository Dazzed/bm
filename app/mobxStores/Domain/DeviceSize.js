import { observable, action, computed, toJS } from 'mobx';
import {
  Dimensions
} from 'react-native';

export default class DeviceSize {
  constructor() {
    this.getDeviceSize()
  }

  @observable longSide = 0;
  @observable shortSide = 0;

  @action getDeviceSize = () => {
    let { height, width } = Dimensions.get('window');
    let long = height;
    let short = width;
    if(height < width) {
      long = width
      short = height
    }
    this.longSide = long;
    this.shortSide = short;
    console.log('GGETTTT DEVICE SIZE long short', this.longSide, this.shortSide)
  }

}
