import { PRODUCTS_PER_PAGE } from "../../app/constants";

// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) =>{
    // console.log(order);
    const res = await fetch("/orders",{
      method: 'POST',
      body: JSON.stringify(order),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}
export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    // console.log(order);
    const res = await fetch(`/orders/${order.id}`,{
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}

export function fetchAllOrders({page, sort}) {
  let queryString = '';
  for(let key in sort)
  {
    queryString += `${key}=${sort[key]}&`;
  }

  queryString += `_page=${page}&_limit=${PRODUCTS_PER_PAGE}`;

  // console.log(queryString);

  return new Promise(async (resolve) =>{
    const res = await fetch(`/orders?${queryString}`);
    const totalOrders = +res.headers.get("X-Total-Count");
    const data = await res.json();
    resolve({data,totalOrders});
  }
  );
}

