"use client";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import Button from "@/components/Button/Button";
import MasterRutePricingForm from "@/container/MasterRutePricing/MasterRutePricingForm";
import { useGetRouteDetailForDetail } from "@/services/masterpricing/masterrute/getRouteDetail";

export default function MasterRutePricingDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  // Get route detail data using API
  const { data, error, isLoading } = useGetRouteDetailForDetail(params.id, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const handleBack = () => {
    router.push("/master-pricing/master-rute-pricing");
  };

  const handleEdit = () => {
    router.push(`/master-pricing/master-rute-pricing/${params.id}/edit`);
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/master-rute-pricing/${params.id}/history`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600">Gagal memuat data: {error.message}</p>
          <Button
            variant="muatparts-primary"
            onClick={handleBack}
            className="mt-4"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Data tidak ditemukan</p>
          <Button
            variant="muatparts-primary"
            onClick={handleBack}
            className="mt-4"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Detail Rute Pricing
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={() => router.push(`/master-pricing/master-rute-pricing/${params.id}/history`)}
        >
          Lihat History Perubahan
        </Button>
      </div>

      <MasterRutePricingForm 
        mode="detail"
        initialData={{
          id: data.id,
          alias: data.alias,
          loadingProvince: data.originProvinces?.map(province => ({
            value: province.id,
            label: province.name,
            id: province.id,
            name: province.name
          })) || [],
          unloadingProvince: data.destinationProvinces?.map(province => ({
            value: province.id,
            label: province.name,
            id: province.id,
            name: province.name
          })) || [],
          isActive: data.isActive,
          createSpecialPriceRoute: data.specialRoutes && data.specialRoutes.length > 0,
          specialRoutes: data.specialRoutes?.map(route => ({
            id: route.id,
            originLocation: {
              id: route.originCityId,
              name: route.originCityName,
              value: route.originCityId
            },
            destinationLocation: {
              id: route.destinationCityId,
              name: route.destinationCityName,
              value: route.destinationCityId
            }
          })) || []
        }}
        disabled={true}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  );
}
