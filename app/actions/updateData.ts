"use server";

export async function updateData(mfo_id: any, col_name: any, value: any) {

    const apiURL = process.env.NEXTAUTH_URL;
    const response = await fetch(`${apiURL}/api/mfo/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mfo_id, col_name, value }),
      });
      const res = await response.json();
      return res;
}

export async function updateDataDistrict(id: any, col_name: any, value: any) {

  const apiURL = process.env.NEXTAUTH_URL;
  const response = await fetch(`${apiURL}/api/byDistrict/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, col_name, value }),
    });
    const res = await response.json();
    return res;
}