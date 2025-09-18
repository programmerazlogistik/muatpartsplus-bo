"use client";
import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Radio from "@/components/Form/Radio";

export default function SettingMarginForm({ onSaveClick, isSubmitting }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      margin: "",
      modelMargin: "",
      effectiveDate: null
    }
  });

  const watchedModelMargin = watch("modelMargin");

  const handleSubmitClick = (e) => {
    e.preventDefault();
    onSaveClick();
  };

  return (
    <div>
      <form onSubmit={handleSubmitClick} className="space-y-6">
        {/* Margin Field */}
        <div className="flex items-start space-x-4">
          <div className="w-32 flex-shrink-0 pt-2">
            <FormLabel required>Margin</FormLabel>
          </div>
          <div className="flex-1 mt-1.5">
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="Masukkan Nilai Margin"
                {...register("margin", { 
                  valueAsNumber: true,
                  required: "Margin wajib diisi",
                  min: {
                    value: 0,
                    message: "Margin harus lebih dari atau sama dengan 0"
                  },
                  max: {
                    value: 100,
                    message: "Margin tidak boleh lebih dari 100%"
                  }
                })}
                className={`flex-1 ${errors.margin ? "border-red-500" : ""}`}
              />
              <span className="ml-2 text-gray-600 font-medium">%</span>
            </div>
            {errors.margin && (
              <span className="text-red-500 text-sm">{errors.margin.message}</span>
            )}
          </div>
        </div>

        {/* Model Margin Field */}
        <div className="flex items-start space-x-4">
          <div className="w-32 flex-shrink-0 pt-2">
            <FormLabel required>Model Margin</FormLabel>
          </div>
          <div className="flex-1 mt-4">
            <input
              type="hidden"
              {...register("modelMargin", { required: "Model Margin wajib dipilih" })}
            />
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Radio
                  id="added-to-formula"
                  name="modelMargin"
                  value="added"
                  checked={watchedModelMargin === "added"}
                  onChange={(e) => setValue("modelMargin", e.target.value, { shouldValidate: true })}
                  className="mr-3"
                />
                <label 
                  htmlFor="added-to-formula" 
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Ditambahkan ke hasil rumus pricing
                </label>
              </div>
              
              <div className="flex items-center">
                <Radio
                  id="included-in-formula"
                  name="modelMargin"
                  value="included"
                  checked={watchedModelMargin === "included"}
                  onChange={(e) => setValue("modelMargin", e.target.value, { shouldValidate: true })}
                  className="mr-3"
                />
                <label 
                  htmlFor="included-in-formula" 
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Termasuk di dalam hasil rumus pricing
                </label>
              </div>
            </div>
            {errors.modelMargin && (
              <span className="text-red-500 text-sm">{errors.modelMargin.message}</span>
            )}
          </div>
        </div>

        {/* Effective Date Field */}
        <div className="flex items-start space-x-4">
          <div className="w-32 flex-shrink-0 pt-2">
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