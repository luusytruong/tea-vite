import AddressSelect from "~/components/common/AddressSelect";

const CustomerForm = ({ initialData, onSubmit }) => {
  // ... code khác

  const [formData, setFormData] = useState({
    // ... các field khác
    city: initialData?.city || "",
    district: initialData?.district || "",
    ward: initialData?.ward || "",
  });

  const handleAddressChange = (address) => {
    setFormData(prev => ({
      ...prev,
      ...address
    }));
  };

  return (
    // ... code khác
    <AddressSelect
      value={{
        city: formData.city,
        district: formData.district,
        ward: formData.ward
      }}
      onChange={handleAddressChange}
      required
    />
    // ... code khác
  );
}; 