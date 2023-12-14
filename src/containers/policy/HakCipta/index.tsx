import { Heading, ListItem, OrderedList } from '@chakra-ui/layout';

const Index = () => {
  return (
    <section className="my-4">
      <Heading as="h2" fontSize="30px" fontFamily="bahijMitra" fontWeight="500">
        HAK CIPTA
      </Heading>
      <OrderedList>
        <ListItem>
          User tidak diperkenankan menggunakan sebagian atau seluruh rancangan
          produk Platform untuk tujuan apapun tanpa seizin Platform.
        </ListItem>
        <ListItem>
          User tidak diperkenankan untuk memodifikasi, menyalin, mengubah atau
          menambah rancangan produk Platform dalam keadaan atau kondisi apapun.
        </ListItem>
        <ListItem>
          User, Pembaca atau Pengakses Platform tidak diperkenankan mengambil,
          mengunduh, menautkan dan/atau melekatkan Konten tanpa mencantumkan
          nama pemilik Konten berikut sumbernya seperti tercantum pada alamat
          URL Konten.
        </ListItem>
        <ListItem>
          Penggunaan Konten di Platform untuk keperluan komersial hanya boleh
          dilakukan atas seizin User dan pihak yang memiliki Konten tersebut.
        </ListItem>
        <ListItem>
          Penggunaan nama, logo dan/atau atribut Platform lainnya untuk tujuan
          apapun harus atas seizin Platform.
        </ListItem>
        <ListItem>
          Seluruh rancangan produk Platform, termasuk namun tidak terbatas
          meliputi tulisan, desain, gambar, audio, video serta kode pemrograman
          di Platform adalah hak cipta milik PT. Media Putra Nusantara.
        </ListItem>
        <ListItem>
          Setiap Konten milik User yang ditempatkan dan/atau ditayangkan di
          Platform, sepanjang tidak ada laporan sebaliknya dari orang atau pihak
          lain, sepenuhnya menjadi milik User yang menempatkan dan/atau
          menayangkannya.
        </ListItem>
        <ListItem>
          Konten milik orang atau pihak lain yang ditempatkan dan/atau
          ditayangkan di Platform atau diunduh (uploaded), ditautkan (linked)
          atau dilekatkan (embed) ke dalam materi yang ditayangkan di Platform,
          hak ciptanya tetap menjadi miliknya. Risiko terkait penggunaan konten
          milik orang atau pihak lain ini sepenuhnya menjadi tanggung jawab User
          yang menempatkan atau menayangkannya di Platform.
        </ListItem>
        <ListItem>
          Platform mendapat izin untuk menawarkan penggunaan Konten ke pihak
          lain, namun penggunaannya tetap atas seizin pemilik Konten.
        </ListItem>
        <ListItem>
          Platform dan afiliasinya dibebaskan dari segala tuntutan dan
          pertanggungjawaban atas pelanggaran hak antara lain yang berkaitan
          dengan Hak Kekayaan Intelektual (HAKI) yang dilakukan oleh pihak
          ketiga terhadap Konten yang ditempatkan dan/atau ditayangkan di
          Platform
        </ListItem>
      </OrderedList>
    </section>
  );
};
export default Index;
