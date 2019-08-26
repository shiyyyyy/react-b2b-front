const fakeProducts = {
  success:true,
  data:[{
    id: '000000001',
    dep_city_id:1,
    b2b_subtag_id: 1,
    b2b_theme_id:2,
    days:1,
    nights:2,
    pd_name:'测试'
  }]
};

const getProducts = (req, res) => {
  return res.json(fakeProducts);
};

export default {
  'GET /api/products': getProducts,
};
