const useFormData = (obj) => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
};

export default useFormData;
