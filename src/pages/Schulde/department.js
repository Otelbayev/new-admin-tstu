export const getDepartment = async (_structure_type, parent) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_BASE_URL_API
    }/hemisapicontroller/data/departments-list?active=1${
      _structure_type && `&_structure_type=${_structure_type}`
    }${parent ? `&parent=${parent}` : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  return data;
};
