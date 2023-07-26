// A mock function to mimic making an async request for data
export function addToCart(userData) {
  return new Promise(async (resolve) =>{
    // console.log(userData);
    const res = await fetch("/carts",{
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}


export function fetchCartByUser() {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/carts`);
    const data = await res.json();
    resolve({data});
  }
  );
}


export function updateCart(user) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/carts/${user.id}`,{
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}

export function deleteItem(itemId) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/carts/${itemId}`,{
      method: 'DELETE',
      headers: {'content-type':'application/json'}
    }
    )
    resolve({data:{id:itemId}});
  }
  );
}

export function resetCart()
{
  return new Promise(async (resolve) =>{

  const res = await fetchCartByUser();
  const items = res.data;
  for(let item of items)
  {
    await deleteItem(item.id);
  }
  resolve({staus: 'success'});

}
  );

}