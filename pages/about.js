import MainLayout from "../layouts/mainLayout";
// import Image from "next/image";
// import { Box } from "@chakra-ui/react";
export default function about() {
  return (
    <div className="container mx-auto">
      <section className="bg-banner-section bg-gray-700 bg-blend-overlay bg-no-repeat bg-cover h-40 bg-center lg:h-60 w-full">
        <div className="flex justify-center items-center h-full">
          <h3 className="font-semibold text-2xl lg:text-3xl text-white shadow-lg">
            About
          </h3>
        </div>
      </section>
      <section className="mb-20 mt-20 px-4 lg:px-16">
        <h3 className="font-bold text-primary text-3xl mb-4">
          Sejarah Singkat
        </h3>
        <p className="text-secondary text-base lg:text-lg leading-loose lg:leading-loose">
          Badan Usaha Milik Desa Laut Sakti Daratan Bertuah adalah sebuah badan
          usaha yang didirikan Pemerintah Desa Pengadah, Kecamatan Bunguran
          Timur Laut, Kabupaten Natuna-Kepulauan Riau. BUMDes saat ini sudah
          masuk ke periode ke 3 yang di Pimpin oleh W. Syamsul Bahari. Proses
          pendirian BUMDes Laut Sakti Daratan Bertuah tidak terlepas dari
          dukungan Pemerintahan Desa Pengadah (Pemerintah Desa dan BPD)
          tokoh-tokoh masyarakat, Pemerintah Kabupaten Natuna, khususnya Dinas
          Pemberdayaan Masyarakat serta dari Kementerian Desa, Pembangunan
          Daerah Tertinggal dan Transmigrasi yang dalam hal ini melalui para
          pendamping desa.
        </p>
      </section>
      <section className="my-20 mt-20 px-4 lg:px-16">
        <h3 className="font-bold text-primary text-3xl mb-4">
          Nama dan Makna Logo
        </h3>
        <p className="text-secondary text-base lg:text-lg leading-loose lg:leading-loose">
          Nama BUMDes adalah Laut Sakti Daratan Bertuah, memiliki makna bahwa
          kami berharap kegiatan yang kami lakukan bisa menjadikan berkah dan
          keberuntungan khususnya bagi seluruh masyarakat Desa Torongrejo, Logo
          BUMDes Laut Sakti Daratan Bertuah memiliki makna, yaitu :
        </p>
        <div className="w-full my-8 flex flex-col items-center">
          <img
            className="object-cover w-full lg:w-1/4"
            src="/logo.jpeg"
            alt=""
          />
        </div>
      </section>
      <section className="my-20 mt-20 px-4 lg:px-16">
        <h3 className="font-bold text-primary text-3xl mb-4">
          Skema kerja Unit dan Mitra
        </h3>
        <p className="text-secondary text-base leading-loose lg:text-lg  lg:leading-loose">
          Unit usaha adalah usaha yang secara keseluruhan manajemennya
          dikendalikan oleh BUMDes Laut Sakti Daratan Bertuah. Mitra Laut Sakti
          Daratan Bertuah adalah pihak diluar BUMDes yang bermitra dengan kami,
          khususnya yang terkait dengan kerjasama usaha. Dalam pengelolaannya
          memiliki manajemen sendiri, yang mengikat adalah kesepakatan kerja
          bersama antara BUMDes dan Mitra. Mitra Bejo bisa berupa perorangan,
          kelompok, lembaga pemerintah, lembaga swasta dll.
        </p>
      </section>
      <section className="my-20 mt-20 px-4 lg:px-16">
        <h3 className="font-bold text-3xl mb-4">
          Team BUMDes Laut Sakti Daratan Bertuah
        </h3>
        <div>
          <div className="flex flex-col items-center justify-center p-4">
            <img
              src="/TeamBumDesPics/ketua.jpeg"
              className="object-cover h-64 w-64 rounded-full mb-4"
            />
            <h3 className="font-bold text-primary text-2xl mb-1">
              Ketua BUMDes
            </h3>
            <p className="text-lg text-secondary">W. Syamsul Bahari</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-0 lg:gap-6">
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src="/TeamBumDesPics/sekretaris.jpeg"
                className="object-cover h-64 w-64 rounded-full mb-4"
              />
              <h3 className="font-bold text-primary text-2xl mb-1">
                Sekretaris
              </h3>
              <p className="text-lg text-secondary">Khairud</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src="/TeamBumDesPics/bendahara.jpeg"
                className="object-cover h-64 w-64 rounded-full mb-4"
              />
              <h3 className="font-bold text-primary text-2xl mb-1">
                Bendahara
              </h3>
              <p className="text-lg text-secondary">Awaluddin Arzie</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-0 lg:gap-6">
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src="/TeamBumDesPics/Anggota1.jpeg"
                className="object-cover h-64 w-64 rounded-full mb-4"
              />
              <h3 className="font-bold text-primary text-2xl mb-1">Anggota</h3>
              <p className="text-lg text-secondary">Kholidin Aziz</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src="/TeamBumDesPics/Anggota2.jpeg"
                className="object-cover h-64 w-64 rounded-full mb-4"
              />
              <h3 className="font-bold text-primary text-2xl mb-1">Anggota</h3>
              <p className="text-lg text-secondary">Hasanudin</p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-20 mt-20 px-4 lg:px-16 bg-blue-900">
        <div className="flex flex-col justify-center items-center px-4 py-28">
          <h3 className="text-lg leading-loose lg:text-3xl font-medium lg:leading-loose lg:tracking-wide text-white text-center">
            <b>
              {" "}
              Ada beberapa budaya dan pola pikir yang kami bangun dalam
              beraktifitas menjalankan BUMDes ini, seperti:{" "}
            </b>
            <i>
              “Kritik dan saran ibarat sebuah makanan sehat yang seharusnya kita
              konsumsi demi kebaikan kita”
            </i>
          </h3>
        </div>
      </section>
    </div>
  );
}

about.layout = MainLayout;
