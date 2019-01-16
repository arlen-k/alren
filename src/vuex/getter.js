import menu from '../common/menu';

const getters = {
    getCurrentMenu:state => {
        return {
          menu:state.currentMenu[0],
          subMenu:state.currentMenu[1]
        }
    }

}

export default getters
