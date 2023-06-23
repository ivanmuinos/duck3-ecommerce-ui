import { home } from 'react-storefront-connector';
import axios from 'axios';

export default async function(req, res) {
  const response = await home(req, res);
  let obj_falopa = await getAppData();
  let obj_falopa_convert = convertObject(obj_falopa);
  res.json(mergeObjects(response, obj_falopa_convert));
}

function convertObject(inputObj) {
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

const getAppData = async () => {
  const response = await axios.get('http://localhost:1337/api/menus?populate=*');
  return response.data;
};
