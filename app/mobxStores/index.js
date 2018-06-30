import ColorStore from './Domain/ColorStore';
import AccountStore from './Domain/AccountStore';

// Import and init all stores here

let colorStore = new ColorStore();
let accountStore = new AccountStore();

export {
    colorStore,
    accountStore
}