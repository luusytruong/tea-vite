import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { address } from "~/data/address";

const AddressSelect = ({ 
  value = {}, 
  onChange,
  error = {},
  required = false,
  className = "" 
}) => {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Lấy danh sách quận/huyện khi chọn tỉnh/thành
  useEffect(() => {
    if (value.city) {
      const cityDistricts = address[value.city] || {};
      // Sửa lại cách map districts để lấy cả mã và tên
      const districtList = Object.entries(cityDistricts)
        .filter(([key]) => key !== 'name')
        .map(([maqh, district]) => ({
          maqh,
          name: district.name
        }));
      setDistricts(districtList);
      
      // Kiểm tra district có tồn tại trong danh sách mới
      const districtExists = districtList.some(d => d.name === value.district);
      if (value.district && !districtExists) {
        onChange({ 
          ...value, 
          district: "", 
          ward: "" 
        });
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [value.city]); // Chỉ phụ thuộc vào city

  // Lấy danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (value.city && value.district) {
      const cityDistricts = address[value.city] || {};
      // Tìm district object dựa trên tên
      const districtEntry = Object.entries(cityDistricts)
        .find(([_, district]) => district.name === value.district);
      
      // Lấy danh sách phường/xã
      const wardList = districtEntry ? cityDistricts[districtEntry[0]]?.wards || [] : [];
      setWards(wardList);
      
      const wardExists = wardList.includes(value.ward);
      if (value.ward && !wardExists) {
        onChange({ 
          ...value, 
          ward: "" 
        });
      }
    } else {
      setWards([]);
    }
  }, [value.city, value.district]); // Bỏ districts ra khỏi dependencies

  const handleChange = (name) => (e) => {
    const newValue = e.target.value;
    if (name === "city") {
      onChange({ 
        ...value,
        city: newValue, 
        district: "", 
        ward: "" 
      });
    } else if (name === "district") {
      onChange({ 
        ...value,
        district: newValue, 
        ward: "" 
      });
    } else {
      onChange({ 
        ...value,
        [name]: newValue 
      });
    }
  };

  return (
    <div className={`flex flex-wrap address-select gap-4 ${className}`}>
      <InputField
        label="Tỉnh/Thành phố"
        name="city"
        as="select"
        value={value.city || ""}
        onChange={handleChange("city")}
        required={required}
        error={error.city}
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {Object.keys(address).map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </InputField>

      <InputField
        label="Quận/Huyện"
        name="district"
        as="select"
        value={value.district || ""}
        onChange={handleChange("district")}
        required={required}
        error={error.district}
        disabled={!value.city}
      >
        <option value="">Chọn quận/huyện</option>
        {districts.map(district => (
          <option key={district.maqh} value={district.name}>
            {district.name}
          </option>
        ))}
      </InputField>

      <InputField
        label="Phường/Xã"
        name="ward"
        as="select"
        value={value.ward || ""}
        onChange={handleChange("ward")}
        required={required}
        error={error.ward}
        disabled={!value.district}
      >
        <option value="">Chọn phường/xã</option>
        {wards.map(ward => (
          <option key={ward} value={ward}>
            {ward}
          </option>
        ))}
      </InputField>
    </div>
  );
};

export default React.memo(AddressSelect); 