import { PRODUCTS_PER_PAGE } from "../../app/constants";

// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const res = await fetch("/products");
    const data = await res.json();
    resolve({data});
  }
  );
}
export function fetchProductsByFilters({filter,sort,page,admin}) {
  let queryString = '';

  for(let key in filter)
  {
    for(let val in filter[key])
    {
      queryString += `${key}=${filter[key][val]}&`;
    }
  }

  for(let key in sort)
  {
    queryString += `${key}=${sort[key]}&`;
  }

  queryString += `_page=${page}&_limit=${PRODUCTS_PER_PAGE}&`;

  if(admin)
  {
    queryString += 'admin=true';
  }

  // console.log(queryString);

  return new Promise(async (resolve) =>{
    const res = await fetch(`/products?${queryString}`);
    const totalItems = res.headers.get("X-Total-Count");
    const data = await res.json();
    resolve({data,totalItems});
  }
  );
}

export function fetchAllCategories() {
  return new Promise(async (resolve) =>{
    const res = await fetch("/categories");
    const data = await res.json();
    resolve({data});
  }
  );
}
export function fetchAllBrands() {
  return new Promise(async (resolve) =>{
    const res = await fetch("/brands");
    const data = await res.json();
    resolve({data});
  }
  );
}


export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/products/${id}`);
    const data = await res.json();
    resolve({data});
  }
  );
}

export function addProduct(product) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/products`,{
      method: 'POST',
      body: JSON.stringify(product),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}

export function updateProduct(product) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/products/${product.id}`,{
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}
export function updateCategory(category) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/categories/${category.id}`,{
      method: 'PATCH',
      body: JSON.stringify(category),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}
export function updateBrand(brand) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/brands/${brand.id}`,{
      method: 'PATCH',
      body: JSON.stringify(brand),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}




