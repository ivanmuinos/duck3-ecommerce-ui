import { home } from 'react-storefront-connector';
import axios from 'axios';

export default async function(req, res) {
  const response = await home(req, res);

  let menu = await getMenus();

  let menu_convert = convertObjectToMenu(menu);

  res.json(mergeObjects(response, menu_convert));
}

function convertObjectToMenu(inputObj) {
  const data = inputObj.data;
  const header = data[0].attributes.header;
  const footer = data[0].attributes.footer;
  const itemsData = data[0].attributes.items.data;

  const items = itemsData.map((item) => {
    return {
      text: item.attributes.text,
      items: [],
    };
  });

  return {
    items,
    header,
    footer,
  };
}

function mergeArrayToObject(inputObj, tabs) {
  inputObj.appData.tabs = tabs;
  return mergedObject;
}

function mergeObjects(obj1, obj2) {
  const mergedObj = {
    pageData: {
      ...obj1.pageData,
      slots: {
        ...obj1.pageData.slots,
        ...obj2,
      },
    },
    appData: {
      ...obj1.appData,
      menu: {
        ...obj2,
      },
    },
  };

  return mergedObj;
}

const getMenus = async () => {
  const response = await axios.get('http://localhost:1337/api/menus?populate=*');
  return response.data;
};

const getTabs = async () => {
  const response = await axios.get('http://localhost:1337/api/tabs?populate=*');
  return response.data;
};
