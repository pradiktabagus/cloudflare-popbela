import dynamic from 'next/dynamic';

const LIST_STATIC_PAGE = [
  { name: 'About', href: '/about-us' },
  { name: 'Career', href: 'https://www.idn.media/career#hire' },
  { name: 'Policy', href: '/kebijakan-privacy' },
  { name: 'Contact', href: '/hubungi-kami' },
  { name: 'Cyber Guidlines', href: '/cyber-media-guidelines' },
];
const CustomLink = dynamic(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const Information = () => {
  return (
    <section className="mt-4 bg-white px-4" data-testid="section-information">
      <ul>
        {LIST_STATIC_PAGE.map(({ name, href }) => (
          <li
            key={name}
            data-testid={`btn-${name.toLowerCase()}`}
            className="flex items-center border-b-[1px] border-solid border-[#e3e3e3] py-2"
          >
            <CustomLink
              href={href}
              className="font-bahijMitra text-2xl font-semibold"
            >
              {name}
            </CustomLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Information;
