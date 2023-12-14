import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Heading, ListItem, OrderedList, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const Description = () => {
  return (
    <ContainerSection>
      <Box
        bg="#fff"
        p={{ base: '0px', md: '45px 40px' }}
        fontSize="24px"
        color="#616161"
      >
        <Box>
          <Text>
            Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan
            pers adalah hak asasi manusia yang dilindungi Pancasila,
            Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia
            PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari
            kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan
            pers.
          </Text>
          <Text>
            Media siber memiliki karakter khusus sehingga memerlukan pedoman
            agar pengelolaannya dapat dilaksanakan secara profesional, memenuhi
            fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun
            1999 tentang Pers dan Kode Etik Jurnalistik. Untuk itu Dewan Pers
            bersama organisasi pers, pengelola media siber, dan masyarakat
            menyusun Pedoman Pemberitaan Media Siber sebagai berikut:
          </Text>
        </Box>
        <Box>
          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            1. Ruang Lingkup
          </Heading>
          <section className="pl-7">
            <Text>
              Media Siber adalah segala bentuk media yang menggunakan wahana
              Internet dan melaksanakan kegiatan jurnalistik, serta memenuhi
              persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang
              ditetapkan Dewan Pers. Isi Buatan Pengguna (User Generated
              Content) adalah segala isi yang dibuat dan atau dipublikasikan
              oleh pengguna media siber, antara lain, artikel, gambar, komentar,
              suara, video dan berbagai bentuk unggahan yang melekat pada media
              siber, seperti blog, forum, komentar pembaca atau pemirsa, dan
              bentuk lain.
            </Text>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            2. Verifikasi dan keberimbangan berita
          </Heading>
          <section className="pl-7">
            <OrderedList type="a" listStyleType="lower-alpha">
              <ListItem>
                Pada prinsipnya setiap berita harus melalui verifikasi.
              </ListItem>
              <ListItem>
                Berita yang dapat merugikan pihak lain memerlukan verifikasi
                pada berita yang sama untuk memenuhi prinsip akurasi dan
                keberimbangan.
              </ListItem>
              <ListItem>
                Ketentuan dalam butir (a) di atas dikecualikan, dengan syarat:
                <OrderedList>
                  <ListItem>
                    Berita benar-benar mengandung kepentingan publik yang
                    bersifat mendesak;
                  </ListItem>
                  <ListItem>
                    Sumber berita yang pertama adalah sumber yang jelas
                    disebutkan identitasnya, kredibel dan kompeten;
                  </ListItem>
                  <ListItem>
                    Subyek berita yang harus dikonfirmasi tidak diketahui
                    keberadaannya dan atau tidak dapat diwawancarai;
                  </ListItem>
                  <ListItem>
                    Media memberikan penjelasan kepada pembaca bahwa berita
                    tersebut masih memerlukan verifikasi lebih lanjut yang
                    diupayakan dalam waktu secepatnya. Penjelasan dimuat pada
                    bagian akhir dari berita yang sama, di dalam kurung dan
                    menggunakan huruf miring.
                  </ListItem>
                </OrderedList>
              </ListItem>
              <ListItem>
                Setelah memuat berita sesuai dengan butir (c), media wajib
                meneruskan upaya verifikasi, dan setelah verifikasi didapatkan,
                hasil verifikasi dicantumkan pada berita pemutakhiran (update)
                dengan tautan pada berita yang belum terverifikasi.
              </ListItem>
            </OrderedList>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            3. Isi Buatan Pengguna (User Generated Content)
          </Heading>
          <section className="pl-7">
            <OrderedList type="a" listStyleType="lower-alpha">
              <ListItem>
                Media siber wajib mencantumkan syarat dan ketentuan mengenai Isi
                Buatan Pengguna yang tidak bertentangan dengan Undang-Undang No.
                40 tahun 1999 tentang Pers dan Kode Etik Jurnalistik, yang
                ditempatkan secara terang dan jelas.
              </ListItem>
              <ListItem>
                Media siber mewajibkan setiap pengguna untuk melakukan
                registrasi keanggotaan dan melakukan proses log-in terlebih
                dahulu untuk dapat mempublikasikan semua bentuk Isi Buatan
                Pengguna. Ketentuan mengenai log-in akan diatur lebih lanjut.
              </ListItem>
              <ListItem>
                Dalam registrasi tersebut, media siber mewajibkan pengguna
                memberi persetujuan tertulis bahwa Isi Buatan Pengguna yang
                dipublikasikan:
                <OrderedList>
                  <ListItem>
                    Tidak memuat isi bohong, fitnah, sadis dan cabul;
                  </ListItem>
                  <ListItem>
                    Tidak memuat isi yang mengandung prasangka dan kebencian
                    terkait dengan suku, agama, ras, dan antargolongan (SARA),
                    serta menganjurkan tindakan kekerasan;
                  </ListItem>
                  <ListItem>
                    Tidak memuat isi diskriminatif atas dasar perbedaan jenis
                    kelamin dan bahasa, serta tidak merendahkan martabat orang
                    lemah, miskin, sakit, cacat jiwa, atau cacat jasmani.
                  </ListItem>
                </OrderedList>
              </ListItem>
              <ListItem>
                Media siber memiliki kewenangan mutlak untuk mengedit atau
                menghapus Isi Buatan Pengguna yang bertentangan dengan butir
                (c). Media siber wajib menyediakan mekanisme pengaduan Isi
                Buatan Pengguna yang dinilai melanggar ketentuan pada butir (c).
                Mekanisme tersebut harus disediakan di tempat yang dengan mudah
                dapat diakses pengguna.
              </ListItem>
              <ListItem>
                Media siber wajib menyunting, menghapus, dan melakukan tindakan
                koreksi setiap Isi Buatan Pengguna yang dilaporkan dan melanggar
                ketentuan butir (c), sesegera mungkin secara proporsional
                selambat-lambatnya 2 x 24 jam setelah pengaduan diterima.
              </ListItem>
              <ListItem>
                Media siber yang telah memenuhi ketentuan pada butir (a), (b),
                (c), dan (f) tidak dibebani tanggung jawab atas masalah yang
                ditimbulkan akibat pemuatan isi yang melanggar ketentuan pada
                butir (c).
              </ListItem>
              <ListItem>
                Media siber bertanggung jawab atas Isi Buatan Pengguna yang
                dilaporkan bila tidak mengambil tindakan koreksi setelah batas
                waktu sebagaimana tersebut pada butir (f).
              </ListItem>
            </OrderedList>
          </section>
          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            4. Ralat, Koreksi, dan Hak Jawab
          </Heading>
          <section className="pl-7">
            <OrderedList type="a" listStyleType="lower-alpha">
              <ListItem>
                Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers,
                Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan
                Dewan Pers.
              </ListItem>
              <ListItem>
                Ralat, koreksi dan atau hak jawab wajib ditautkan pada berita
                yang diralat, dikoreksi atau yang diberi hak jawab.
              </ListItem>
              <ListItem>
                Di setiap berita ralat, koreksi, dan hak jawab wajib dicantumkan
                waktu pemuatan ralat, koreksi, dan atau hak jawab tersebut.
              </ListItem>
              <ListItem>
                Bila suatu berita media siber tertentu disebarluaskan media
                siber lain, maka:
                <OrderedList>
                  <ListItem>
                    Tanggung jawab media siber pembuat berita terbatas pada
                    berita yang dipublikasikan di media siber tersebut atau
                    media siber yang berada di bawah otoritas teknisnya;
                  </ListItem>
                  <ListItem>
                    Koreksi berita yang dilakukan oleh sebuah media siber, juga
                    harus dilakukan oleh media siber lain yang mengutip berita
                    dari media siber yang dikoreksi itu;
                  </ListItem>
                  <ListItem>
                    Media yang menyebarluaskan berita dari sebuah media siber
                    dan tidak melakukan koreksi atas berita sesuai yang
                    dilakukan oleh media siber pemilik dan atau pembuat berita
                    tersebut, bertanggung jawab penuh atas semua akibat hukum
                    dari berita yang tidak dikoreksinya itu.
                  </ListItem>
                </OrderedList>
              </ListItem>
              <ListItem>
                Sesuai dengan Undang-Undang Pers, media siber yang tidak
                melayani hak jawab dapat dijatuhi sanksi hukum pidana denda
                paling banyak Rp500.000.000 (Lima ratus juta rupiah).
              </ListItem>
            </OrderedList>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            5. Pencabutan Berita
          </Heading>
          <section className="pl-7">
            <OrderedList type="a" listStyleType="lower-alpha">
              <ListItem>
                Berita yang sudah dipublikasikan tidak dapat dicabut karena
                alasan penyensoran dari pihak luar redaksi, kecuali terkait
                masalah SARA, kesusilaan, masa depan anak, pengalaman traumatik
                korban atau berdasarkan pertimbangan khusus lain yang ditetapkan
                Dewan Pers.
              </ListItem>
              <ListItem>
                Media siber lain wajib mengikuti pencabutan kutipan berita dari
                media asal yang telah dicabut.
              </ListItem>
              <ListItem>
                Pencabutan berita wajib disertai dengan alasan pencabutan dan
                diumumkan kepada publik.
              </ListItem>
            </OrderedList>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            6. Iklan
          </Heading>
          <section className="pl-7">
            <OrderedList type="a" listStyleType="lower-alpha">
              <ListItem>
                Media siber wajib membedakan dengan tegas antara produk berita
                dan iklan.
              </ListItem>
              <ListItem>
                Setiap berita/artikel/isi yang merupakan iklan dan atau isi
                berbayar wajib mencantumkan keterangan &quot;advertorial&quot;,
                &quot;iklan&quot;, &quot;ads&quot;, &quot;sponsored&quot;, atau
                kata lain yang menjelaskan bahwa berita/artikel/isi tersebut
                adalah iklan.
              </ListItem>
            </OrderedList>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            7. Hak Cipta
          </Heading>
          <section className="pl-7">
            <Text>
              Media siber wajib menghormati hak cipta sebagaimana diatur dalam
              peraturan perundang-undangan yang berlaku.
            </Text>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            8. Pencantuman Pedoman
          </Heading>
          <section className="pl-7">
            <Text>
              Media siber wajib mencantumkan Pedoman Pemberitaan Media Siber ini
              di medianya secara terang dan jelas.
            </Text>
          </section>

          <Heading
            as="h2"
            marginTop="20px"
            marginBottom="10px"
            fontSize="22px"
            fontFamily="limerick"
            fontWeight="700"
            lineHeight="1.4"
          >
            9. Sengketa
          </Heading>
          <section className="pl-7">
            <Text>
              Penilaian akhir atas sengketa mengenai pelaksanaan Pedoman
              Pemberitaan Media Siber ini diselesaikan oleh Dewan Pers.
            </Text>
          </section>
        </Box>
      </Box>
    </ContainerSection>
  );
};
export default Description;
