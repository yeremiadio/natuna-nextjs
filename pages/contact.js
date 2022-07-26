import React, { useEffect } from "react";
// import { Tag, TagLabel } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import { PhoneIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import MainLayout from "../layouts/mainLayout";
// import { currencyFormat } from "../config/currencyFormat";
import { fadeInUp, stagger } from "../utils/transitionProps";

export default function ContactUs() {
  let message = `Halo kak, saya ingin bertanya - tanya tentang produk dari BUMDes ini kak. Terimakasih`;
  return (
    <>
      <div className="container mx-auto">
        <motion.div
          variants={stagger}
          className="my-12 lg:my-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center items-center w-full lg:px-12 px-4"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2038699.3741463588!2d107.3346065215605!3d3.6252089347781276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31e979f03ffac6dd%3A0x3039d80b220cee0!2sNatuna%20Regency%2C%20Riau%20Islands!5e0!3m2!1sen!2sid!4v1637772496279!5m2!1sen!2sid"
              width="100%"
              height="450"
              className="overflow-hidden rounded-t-md"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center w-auto px-4 lg:px-16"
          >
            <h3 className="text-primary text-3xl font-bold line-clamp-2 mb-2">
              Kontak Kami
            </h3>
            <p className="text-secondary text-sm lg:text-base line-clamp-3 leading-loose">
              Alamat: Jl. Ismail Mahdi
            </p>
            <p className="text-secondary text-sm lg:text-base line-clamp-3 leading-loose">
              Telp : 0812-5421-8870
            </p>
            <p className="text-secondary text-sm lg:text-base line-clamp-3 leading-loose">
              Email:{" "}
              <a href="mailto:bumdesdesapengadah@gmail.com" className="underline">
                bumdesdesapengadah@gmail.com
              </a>
            </p>
            <Button
              size="md"
              leftIcon={<PhoneIcon className="w-5 h-5" />}
              colorScheme="blue"
              className="p-6 mt-4"
              onClick={() =>
                window.open(
                  `https://wa.me/6281254218870?text=${encodeURIComponent(
                    message
                  )}`,
                  "__blank"
                )
              }
            >
              Kontak Kami
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

ContactUs.layout = MainLayout;
