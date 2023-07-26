export function fetchUserOrders() {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/orders/own`);
    const data = await res.json();
    resolve({data});
  }
  );
}
export function fetchUser() {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/users/own`);
    const data = await res.json();
    resolve({data});
  }
  );
}

export function updateUser(userData) {
  return new Promise(async (resolve) =>{
    const res = await fetch(`/users/${userData.id}`,{
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: {'content-type':'application/json'}
    }
    )
    const data = await res.json();
    resolve({data});
  }
  );
}