"use client";
import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";

export default function SettingTarifMinimalForm({ onSaveClick, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      coltDieselEngkel: "",
      coltDieselDouble: "",
      mediumTruckRigid4x2: "",
      mediumTruck6x2Rigid: "",
      mediumTruckRigid6x4: "",
      mediumTruck4x2Gandengan: "",
      tractorHead4x2SemiTrailer: "",
      tractorHead6x4SemiTrailer: "",
      effectiveDate: null
    }
  });

  const handleSubmitClick = (e) => {
    e.preventDefault();
    onSaveClick();
  };

  const vehicleTypes = [
    {
      key: "coltDieselEngkel",
      label: "Colt Diesel Engkel"
    },
    {
      key: "coltDieselDouble", 
      label: "Colt Diesel Double"
    },
    {
      key: "mediumTruckRigid4x2",
      label: "Medium truck Rigid 4 x 2"
    },
    {
      key: "mediumTruck6x2Rigid",
      label: "Medium truck 6 x 2 (Rigid)"
    },
    {
      key: "mediumTruckRigid6x4",
      label: "Medium Truck Rigid 6 x 4"
    },
    {
      key: "mediumTruck4x2Gandengan",
      label: "Medium truck 4 x 2 + gandengan"
    },
    {
      key: "tractorHead4x2SemiTrailer",
      label: "Tractor Head 4x2 dan Medium Semi Trailer"
    },
    {
      key: "tractorHead6x4SemiTrailer",
      label: "Tractor head 6 x 4 dan Semi Trailer"
    }
  ];

  return (
    <div>
      <form onSubmit={handleSubmitClick} className="space-y-6">
        {/* Vehicle Type Fields */}
        {vehicleTypes.map((vehicle) => (
          <div key={vehicle.key} className="flex items-start space-x-4">
            <div className="w-80 flex-shrink-0 pt-2">
              <FormLabel>{vehicle.label}</FormLabel>
            </div>
            <div className="flex-1 mt-1.5">
              <div className="flex items-center">
                <Input
                  type="number"
                  placeholder="Masukkan Minimal Jarak Tempuh"
                  {...register(vehicle.key, { 
                    valueAsNumber: true,
                    required: `${vehicle.label} wajib diisi`,
                    min: {
                      value: 0,
                      message: "Jarak tempuh harus lebih dari atau sama dengan 0"
                    }
                  })}
                  className={`flex-1 ${errors[vehicle.key] ? "border-red-500" : ""}`}
                />
                <span className="ml-2 text-gray-600 font-medium">km</span>
              </div>
              {errors[vehicle.key] && (
                <span className="text-red-500 text-sm">{errors[vehicle.key].message}</span>
              )}
            </div>
          </div>
        ))}

        {/* Effective Date Field */}
        <div className="flex items-start space-x-4">
          <div className="w-80 flex-shrink-0 pt-2">
            <FormLabel required>Berlaku Mulai</FormLabel>
          </div>
          <div className="flex-1 mt-1.5">
            <input
              type="hidden"
              {...register("effectiveDate", { required: "Berlaku Mulai wajib diisi" })}
            />
            <DatePicker
              value={watch("effectiveDate")}
              onChange={(date) => setValue("effectiveDate", date, { shouldValidate: true })}
              placeholder="dd/mm/yyyy"
              errorMessage={errors.effectiveDate?.message}
              className="w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            variant="muatparts-primary"
            disabled={isSubmitting}
            className="px-8 py-2"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}