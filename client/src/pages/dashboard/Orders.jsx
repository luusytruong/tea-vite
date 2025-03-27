import AddressSelect from "~/components/common/AddressSelect";

const OrderForm = ({ initialData, onSubmit }) => {
  // ... code khác

  const [formData, setFormData] = useState({
    // ... các field khác
    shippingAddress: {
      city: initialData?.shippingAddress?.city || "",
      district: initialData?.shippingAddress?.district || "",
      ward: initialData?.shippingAddress?.ward || "",
    }
  });

  const handleAddressChange = (address) => {
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        ...address
      }
    }));
  };

  return (
    // ... code khác
    <AddressSelect
      value={{
        city: formData.shippingAddress.city,
        district: formData.shippingAddress.district,
        ward: formData.shippingAddress.ward
      }}
      onChange={handleAddressChange}
      required
    />
    // ... code khác
  );
}; 