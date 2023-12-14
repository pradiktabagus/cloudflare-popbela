import {
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/layout';

const Index = () => {
  return (
    <section className="my-4">
      <Heading as="h2" fontSize="30px" fontFamily="bahijMitra" fontWeight="500">
        PERSYARATAN LAYANAN
      </Heading>
      <OrderedList>
        <ListItem>
          User adalah pemilik dari konten yang User kirim. User juga memberikan
          Platform dan pengguna platform Platform lainnya sejumlah hak dan
          lisensi untuk menggunakannya.
        </ListItem>
        <ListItem>
          User bertanggung jawab atas konten yang User kirim. Ini termasuk
          memastikan bahwa User memiliki hak yang dibutuhkan untuk mengirim
          konten tersebut dan konten User itu tidak melanggar hak legal dari
          pihak lain atau hukum terkait lainnya.
        </ListItem>
        <ListItem>
          User setuju untuk mengikuti aturan dari Platform. Ketika User
          menggunakan Platform, User juga menyetujui Ketentuan Layanan Platform.
        </ListItem>
        <ListItem>
          Adapun data akun yang dikumpulkan di platform ini di antaranya adalah
          <UnorderedList marginInlineStart="2.5rem">
            <ListItem>Nama</ListItem>
            <ListItem>Email</ListItem>
            <ListItem>Profile Picture (Facebook Login)</ListItem>
            <ListItem>Tanggal Lahir</ListItem>
            <ListItem>Jenis Kelamin</ListItem>
            <ListItem>Provinsi</ListItem>
            <ListItem>Kota</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          Adapun data yang dikumpulkan ditujukan untuk
          <UnorderedList marginInlineStart="2.5rem">
            <ListItem>Memberikan dukungan dan layanan lainnya</ListItem>
            <ListItem>
              Memberikan informasi mengenai informasi dan produk terkini
            </ListItem>
            <ListItem>
              Menganalisis perilaku pelanggan untuk memberikan pelayanan yang
              lebih baik
            </ListItem>
            <ListItem>
              Menginformasikan manfaat, program, dan kesempatan yang kami
              berikan kepada anda
            </ListItem>
            <ListItem>Berhubungan dengan pihak ketiga</ListItem>
            <ListItem>Melindungi konten dan layanan kami</ListItem>
            <ListItem>Mendapatkan saran dan masukan anda</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          Apabila User berniat mengajukan permintaan untuk menghapus akun dan
          informasi pribadi User yang kami kumpulkan, User dapat mengirimkan
          email ke alamat{' '}
          <a href="mailto:hello@popbela.com" className="text-primary">
            hello@popbela.com
          </a>
          <br></br>Dengan mengirimkan permintaan ini, User akan kehilangan data
          di IDN Media, antara lain:
          <UnorderedList marginInlineStart="2.5rem">
            <ListItem>Detail Akun (semua data di point 4)</ListItem>
            <ListItem>Semua Riwayat Aktivitas</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          Data aktivitas User akan otomatis terhapus setelah 30 (tiga puluh)
          hari dari permintaan hapus data akun dan aktivitas. User tidak akan
          memiliki opsi untuk mengaktifkan kembali atau mengambil informasi
          tersebut. Apabila user ingin beraktivitas lagi pada Platform, maka
          User wajib kembali melakukan Sign Up.
        </ListItem>
      </OrderedList>
    </section>
  );
};
export default Index;
