import axios from "axios";
export const actions = {
  setProducts: "SET_PRODUCTS",
  setIsLoading: "SET_ISLOADING",
  setCategories: "SET_CATEGORIES",
  setFavorites: "SET_FAVORITES",
  setPurches: "SET_PURCHES",
 
};
const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const setProducts = (products) => ({
  type: actions.setProducts,
  payload: products,
});
export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading,
});
export const setCategories = (categories) => ({
  type: actions.setCategories,
  payload: categories,
});
export const setFavorites = (favorites) =>({
  type:actions.setFavorites,
  payload: favorites,
});
export const setPurches = (purches) =>({
  type:actions.setPurches,
  payload: purches,
});
export const getProductsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get('https://ecommerce-api-react.herokuapp.com/api/v1/products' )
      .then((res) => {
        dispatch(setProducts(res.data.data.products));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const getCategoriesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/")
      .then((res) => dispatch(setCategories(res.data.data?.categories)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const filterCategoriesThunk = id => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const filterHeadlineThunk = headline => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${headline}`
      )
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const loginThunk = (credentialKey) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(
          "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",credentialKey )
            
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const addFavoritesThunk = products => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(
          "https://ecommerce-api-react.herokuapp.com/api/v1/cart",products,getConfig())
            
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const getFavoritesThunk =() => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => dispatch(setFavorites(res.data.data.cart.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const deleteFavoritesThunk =(id)=> {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,getConfig())
      .then(() => dispatch(getFavoritesThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const getPurchesThunk =()=> {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases/",
        getConfig()      )
      .then((res) => dispatch(setPurches(res.data.data.purchases)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const getMarketThunk =()=> {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
      .then(()=>{dispatch(getPurchesThunk());
                dispatch(getFavoritesThunk());
                dispatch(getProductsThunk());})
       .finally(() => dispatch(setIsLoading(false)));
  };
};

