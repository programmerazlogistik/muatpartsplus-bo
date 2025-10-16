import { CardRiwayatPerubahan } from "@muatmuat/ui/Card";

export default {
  title: "Components/Card/CardRiwayatPerubahan",
  component: CardRiwayatPerubahan.Root,
  parameters: {
    docs: {
      description: {
        component:
          "A comprehensive change history card system for tracking order modifications, driver/fleet changes, " +
          "route updates, and transporter changes. Provides timeline-based visualization of order lifecycle events " +
          "with detailed before/after comparisons and collapsible content sections.",
      },
    },
    layout: "padded",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title of the change history card",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Riwayat Aktivitas" },
      },
    },
    children: {
      control: false,
      description: "Child components (Items and ContentPerubahan)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

// Mock data for stories
const mockTimestamp = "15 Mar 2024, 14:30";
const mockTimestampOld = "15 Mar 2024, 10:15";

const mockDriverBefore = {
  name: "Ahmad Subagyo",
  picture: "/images/driver-1.jpg",
};

const mockDriverAfter = {
  name: "Budi Santoso",
  picture: "/images/driver-2.jpg",
};

const mockFleetBefore = {
  plate: "B 1234 XYZ",
  name: "Ahmad Subagyo",
  picture: "/images/truck-1.jpg",
};

const mockFleetAfter = {
  plate: "B 5678 ABC",
  name: "Budi Santoso",
  picture: "/images/truck-2.jpg",
};

const mockTransporterBefore = [
  {
    name: "PT Transport Jaya",
    picture: "/images/company-1.jpg",
    units: 5,
    phone: "+6281234567890",
  },
];

const mockTransporterAfter = [
  {
    name: "PT Angkutan Nusantara",
    picture: "/images/company-2.jpg",
    units: 8,
    phone: "+6281987654321",
  },
];

const mockRouteBefore = {
  distance: "450 KM",
  pickups: [
    { sequence: 1, district: "Kemayoran, Jakarta Pusat" },
    { sequence: 2, district: "Tanah Abang, Jakarta Pusat" },
  ],
  dropoffs: [{ sequence: 1, district: "Gubeng, Surabaya" }],
};

const mockRouteAfter = {
  distance: "520 KM",
  pickups: [
    { sequence: 1, district: "Kemayoran, Jakarta Pusat" },
    { sequence: 2, district: "Senen, Jakarta Pusat" },
  ],
  dropoffs: [
    { sequence: 1, district: "Wonokromo, Surabaya" },
    { sequence: 2, district: "Rungkut, Surabaya" },
  ],
};

const mockTimeChangeBefore = {
  timestamp: "16 Mar 2024, 08:00 - 16 Mar 2024, 12:00",
};

const mockTimeChangeAfter = {
  timestamp: "17 Mar 2024, 09:00 - 17 Mar 2024, 13:00",
};

// Basic Usage
export const Default = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Ahmad Subagyo"
        action="mengubah detail pesanan"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <p className="text-sm">Detail perubahan akan ditampilkan di sini</p>
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Driver Change
export const DriverChange = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="System Admin"
        action="mengubah driver untuk pesanan ini"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Driver">
          <CardRiwayatPerubahan.ItemPerubahanDriver
            isFirst={true}
            timestamp={mockTimestamp}
            before={mockDriverBefore}
            after={mockDriverAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Fleet Change
export const FleetChange = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Fleet Manager"
        action="mengubah armada untuk pesanan ini"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Armada">
          <CardRiwayatPerubahan.ItemPerubahanArmada
            isFirst={true}
            timestamp={mockTimestamp}
            before={mockFleetBefore}
            after={mockFleetAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Transporter Change
export const TransporterChange = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Order Manager"
        action="mengubah transporter untuk pesanan ini"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Transporter">
          <CardRiwayatPerubahan.ItemPerubahanTransporter
            isFirst={true}
            timestamp={mockTimestamp}
            before={mockTransporterBefore}
            after={mockTransporterAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Transporter Change with Blast
export const TransporterChangeWithBlast = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Order Manager"
        action="mengubah transporter dan melakukan blast order"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Transporter">
          <CardRiwayatPerubahan.ItemPerubahanTransporter
            isFirst={true}
            timestamp={mockTimestamp}
            before={mockTransporterBefore}
            after={mockTransporterAfter}
            blastCount={3}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Route Change
export const RouteChange = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Logistics Coordinator"
        action="mengubah rute muat dan bongkar"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Rute">
          <CardRiwayatPerubahan.ItemPerubahanRute
            isFirst={true}
            before={mockRouteBefore}
            after={mockRouteAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Time Change
export const TimeChange = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Scheduler"
        action="mengubah waktu muat untuk pesanan ini"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Waktu">
          <CardRiwayatPerubahan.ItemPerubahanWaktu
            isFirst={true}
            isLast={true}
            before={mockTimeChangeBefore}
            after={mockTimeChangeAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Order Cancellation
export const OrderCancellation = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp={mockTimestamp}
        actor="PT Transport Jaya"
        action="membatalkan pesanan"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Pembatalan">
          <CardRiwayatPerubahan.ItemPesananDibatalkan
            picture="/images/company-1.jpg"
            name="PT. Airmas International (AIRI)"
            unit={1}
            reason="Armada sedang mengalami masalah teknis dan tidak dapat melanjutkan perjalanan. Perlu waktu perbaikan selama 2-3 hari."
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// GM Rejection
export const GMRejection = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp={mockTimestamp}
        actor="General Manager"
        action="menolak perubahan pesanan"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Penolakan">
          <CardRiwayatPerubahan.ItemPenolakanGM
            title="Alasan Penolakan"
            reason="Perubahan rute tidak sesuai dengan kebijakan operasional perusahaan. Rute yang diusulkan memiliki risiko tinggi dan dapat mempengaruhi efisiensi pengiriman."
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Multiple Timeline Items
export const MultipleChanges = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp="15 Mar 2024, 16:45"
        actor="System Admin"
        action="menyetujui perubahan driver"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Persetujuan Perubahan">
          <p className="text-sm">
            Perubahan driver telah disetujui dan akan diterapkan pada pesanan
            ini.
          </p>
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>

      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp={mockTimestamp}
        actor="Fleet Manager"
        action="mengubah driver untuk pesanan ini"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan Driver">
          <CardRiwayatPerubahan.ItemPerubahanDriver
            isFirst={true}
            timestamp={mockTimestamp}
            before={mockDriverBefore}
            after={mockDriverAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>

      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp={mockTimestampOld}
        actor="Order Manager"
        action="membuat pesanan baru"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Pesanan">
          <p className="text-sm">
            Pesanan telah dibuat dengan driver awal Ahmad Subagyo dan armada B
            1234 XYZ.
          </p>
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Complex Change History
export const ComplexChangeHistory = {
  render: () => (
    <CardRiwayatPerubahan.Root title="Riwayat Perubahan Pesanan">
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp="15 Mar 2024, 17:30"
        actor="General Manager"
        action="menyetujui semua perubahan"
      />

      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp="15 Mar 2024, 16:15"
        actor="Logistics Coordinator"
        action="mengubah rute muat dan bongkar"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <CardRiwayatPerubahan.ItemPerubahanRute
            isFirst={true}
            before={mockRouteBefore}
            after={mockRouteAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>

      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp="15 Mar 2024, 15:45"
        actor="Fleet Manager"
        action="mengubah armada"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <CardRiwayatPerubahan.ItemPerubahanArmada
            isFirst={true}
            timestamp="15 Mar 2024, 15:45"
            before={mockFleetBefore}
            after={mockFleetAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>

      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp={mockTimestamp}
        actor="System Admin"
        action="mengubah driver"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <CardRiwayatPerubahan.ItemPerubahanDriver
            isFirst={true}
            timestamp={mockTimestamp}
            before={mockDriverBefore}
            after={mockDriverAfter}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>

      <CardRiwayatPerubahan.Item
        isActive={false}
        timestamp={mockTimestampOld}
        actor="Order Manager"
        action="membuat pesanan"
      />
    </CardRiwayatPerubahan.Root>
  ),
};

// Edge Cases
export const LongContent = {
  render: () => (
    <CardRiwayatPerubahan.Root>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Ahmad Subagyo Pranoto Wijayanto"
        action="mengubah detail pesanan dengan perubahan yang sangat kompleks dan memerlukan perhatian khusus dari semua pihak terkait"
      >
        <CardRiwayatPerubahan.ContentPerubahan title="Detail Perubahan yang Sangat Panjang dan Kompleks">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
};

// Empty State
export const EmptyState = {
  render: () => (
    <CardRiwayatPerubahan.Root title="Riwayat Aktivitas">
      <div className="py-8 text-center text-neutral-500">
        <p className="text-sm">Belum ada aktivitas pada pesanan ini</p>
      </div>
    </CardRiwayatPerubahan.Root>
  ),
};

// Playground
export const Playground = {
  render: (args) => (
    <CardRiwayatPerubahan.Root {...args}>
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp={mockTimestamp}
        actor="Test User"
        action="melakukan perubahan untuk testing"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <p className="text-sm">
            Konten ini dapat disesuaikan menggunakan controls panel
          </p>
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  ),
  args: {
    title: "Riwayat Aktivitas",
  },
};
