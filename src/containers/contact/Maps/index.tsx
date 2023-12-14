import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const Maps = () => {
  return (
    <ContainerSection marginTop="30px">
      <Box p={{ base: '0px', md: '45px 40px' }}>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box
            position="relative"
            height={{ base: '30vh', md: '350px' }}
            width={{ base: '100%', md: '100%' }}
            flex="1"
          >
            <iframe
              title="maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.393090156815!2d106.80052183537114!3d-6.2177202964521845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f1e1763d97%3A0xb413df1da97610fb!2sIDN%20Media%20HQ!5e0!3m2!1sen!2sid!4v1595574323628!5m2!1sen!2sid"
              width="100%"
              height="100%"
              className="border-none"
              allowFullScreen
              aria-hidden="false"
            />
          </Box>
          <Box
            p="20px"
            fontSize="22px"
            color="#616161"
            flex="1"
            marginLeft={{ base: '0', md: '15px' }}
          >
            <table className="w-full">
              <tr>
                <th className="align-top">Address</th>
                <th className="align-top">:</th>
                <td>
                  Jl. Jend. Gatot Subroto Kav. 27 16th Floor<br></br>Kuningan,
                  Jakarta, Indonesia<br></br>12950
                </td>
              </tr>
              <tr>
                <th className="align-top">Phone</th>
                <th className="align-top">:</th>
                <td>+62 21 397 13 888</td>
              </tr>
            </table>
          </Box>
        </Flex>
        <Center p="20px" fontSize="24px" color="#616161">
          <div>
            <Heading
              fontSize="24px"
              fontWeight="700"
              color="#000"
              as="h5"
              marginTop="40px"
              textAlign="center"
              marginBottom="20px"
            >
              IDN Media Surabaya
            </Heading>
            <table className="w-full border-y-[1px] border-y-[#ddd]">
              <tr className="border-b-[1px] border-b-[#ddd]">
                <th className="w-24 align-top text-black">Address</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">
                  Sentra Darmo Villa Blok C1-2
                  <br />
                  Jl. Raya Darmo Permai Selatan No. 6-14
                  <br />
                  Surabaya (60226), Indonesia
                </td>
              </tr>
              <tr>
                <th className=" w-24 align-top text-black">Phone</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">
                  +62 31 731 8228
                  <br />
                  +62 31 731 9568
                </td>
              </tr>
            </table>
          </div>
        </Center>
        <Center p="20px" fontSize="24px" color="#616161">
          <div>
            <Heading
              fontSize="24px"
              fontWeight="700"
              color="#000"
              as="h5"
              marginTop="40px"
              marginBottom="20px"
              textAlign="center"
            >
              IDN Media Tumaritis
            </Heading>
            <table className="w-full border-y-[1px] border-y-[#ddd]">
              <tr className="border-b-[1px] border-b-[#ddd]">
                <th className="w-24 align-top text-black">Address</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">
                  Jl. Tumaritis No. 5B
                  <br />
                  Cilandak Barat, Cilandak
                  <br />
                  Jakarta (12430), Indonesia
                </td>
              </tr>
              <tr>
                <th className=" w-24align-top text-black">Phone</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">+62 21 759 14573</td>
              </tr>
              <tr>
                <th className=" w-24align-top text-black">Email</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">hi@idntimes.com</td>
              </tr>
            </table>
          </div>
        </Center>
        <Center p="20px" fontSize="24px" color="#616161">
          <div>
            <Heading
              fontSize="24px"
              fontWeight="700"
              color="#000"
              as="h5"
              marginTop="40px"
              marginBottom="20px"
              textAlign="center"
            >
              IDN Media Yogyakarta
            </Heading>
            <table className="w-full border-y-[1px] border-y-[#ddd]">
              <tr className="border-b-[1px] border-b-[#ddd]">
                <th className="w-24 align-top text-black">Address</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">
                  Taman Komunikasi
                  <br />
                  Jl. Cempaka 9, Deresan, Caturtunggal, Kec. Depok
                  <br />
                  Kabupaten Sleman, Daerah Istimewa Yogyakarta (55281)
                </td>
              </tr>
              <tr>
                <th className=" w-24align-top text-black">Email</th>
                <th className="align-top text-black">:</th>
                <td className="align-top">hi@idntimes.com</td>
              </tr>
            </table>
          </div>
        </Center>
      </Box>
    </ContainerSection>
  );
};
export default Maps;
